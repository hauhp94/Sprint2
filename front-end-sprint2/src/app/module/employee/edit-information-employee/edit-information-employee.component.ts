import { Component, OnInit } from '@angular/core';
import {Employee} from '../../../model/employee/employee';
import {Account} from '../../../model/account/account';
import {Gender} from '../../../model/gender/gender';
import {Observable} from 'rxjs';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {EmployeeService} from '../../../service/employee/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {finalize} from 'rxjs/operators';
// import {TokenStorageService} from '../../../service/security/token-storage.service';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Component({
  selector: 'app-edit-information-employee',
  templateUrl: './edit-information-employee.component.html',
  styleUrls: ['./edit-information-employee.component.css']
})
export class EditInformationEmployeeComponent implements OnInit {
  public showEmployee: Employee;
  public account: Account;
  public username: string;
  public employeeForm: FormGroup;
  public gender: Gender;
  public id: number;
  public employee: Employee;
  public genderList: Gender[];
  public selectedFile: File = null;
  public fb;
  public downloadURL: Observable<string>;
  public imgSrc: string;
  public check = false;
  public selectedImage: any = null;
  public isImage = false;
  public listError: any = '';
  public passW: string;


  constructor(private storage: AngularFireStorage,
              private employeeService: EmployeeService,
              private router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService
  ) {
    this.titleService.setTitle('Thay đổi thông tin');
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.employeeService.getGenderList().subscribe(value => {
      this.genderList = value;
    });
  }

  ngOnInit(): void {
    this.getForm();
    this.showEmployee = this.tokenStorageService.getUser().employee;
    this.imgSrc = this.showEmployee.image;
    this.employeeForm.patchValue(this.showEmployee);
    this.employeeForm.controls.accountDto.get('accountId').setValue(this.showEmployee.account.accountId);
    this.employeeForm.controls.accountDto.get('username').setValue(this.showEmployee.account.username);
    this.employeeForm.controls.accountDto.get('password').setValue(this.showEmployee.account.password);
    this.employeeForm.controls.accountDto.get('confirmPassword').setValue(this.showEmployee.account.password);
    this.gender = this.showEmployee.gender;
    this.employeeForm.controls.genderDto.setValue(this.gender);
    // this.employeeService.findById(this.id).subscribe(value => {
    //   this.employee = value;
    //   this.employeeForm.patchValue(value);
    //   this.employeeForm.controls.accountDto.get('accountId').setValue(value.account.accountId);
    //   this.employeeForm.controls.accountDto.get('username').setValue(value.account.username);
    //   this.employeeForm.controls.accountDto.get('password').setValue(value.account.password);
    //   this.employeeForm.controls.accountDto.get('confirmPassword').setValue(value.account.password);
    //   this.gender = value.gender;
    //   this.employeeForm.controls.genderDto.setValue(this.gender);
    //   this.imgSrc = value.image;
    // }, error => alert('loi'));
  }

  getForm(){
    this.employeeForm = new FormGroup({
      employeeId: new FormControl(''),
      employeeCode: new FormControl(''),
      flag: new FormControl(''),
      salary: new FormControl(''),
      idCard: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      birthDate: new FormControl('', Validators.required),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      image: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.maxLength(12)]),
      genderDto: new FormControl('', Validators.required),
      accountDto: new FormGroup({
        accountId: new FormControl(''),
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
      }, this.conparePassword)
    });
  }

  conparePassword(c: AbstractControl): any {
    const v = c.value;
    return v.password === v.confirmPassword ? null : {passwordnotmatch: true};
  }

  editEmployee() {
    console.log(this.employeeForm.value);
    this.employeeService.updateInfor(this.employeeForm.value).subscribe(data => {
      this.router.navigateByUrl('/');
      this.toastr.success('Cập nhật thông tin thành công!', 'Chỉnh sửa');

    }, error => {
      if (error.status === 400) {
        this.listError = error.error;
      }
      this.toastr.error('Cập nhật thông tin thất bại!', 'Chỉnh sửa');
    });
  }

  onFileSelected(event) {
    const n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.employeeForm.patchValue({image: url});
            }
            console.log('fb la:' + this.fb);
            this.imgSrc = this.fb;
            if (this.imgSrc !== '') {
              this.check = true;
            }
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.genderId === c2.genderId : c1 === c2;
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage !== this.imgSrc) {
      this.loadImg();
    }
  }

  loadImg() {
    Swal.fire({
      title: 'Sending data',
      text: 'Please wait ...',
      imageUrl: '../../../../../assets/image/spin.gif',
      imageWidth: '100px',
      showConfirmButton: false,
      allowOutsideClick: false
    });
    const nameImg = this.getCurrentDateTime() + this.selectedImage?.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.employeeForm.value.image = url;
          this.imgSrc = url;
          this.isImage = true;
          Swal.close();
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

// editEmployee() {
//   this.employeeService.updateEmployee(this.id, this.employeeForm.value).subscribe(data => {
//     this.router.navigateByUrl('');
//     this.toastr.success('Cập nhật thông tin thành công!', 'Chỉnh sửa');
//   }, error => {
//     if (error.status === 400) {
//       this.listError = error.error;
//     }
//     this.toastr.error('Cập nhật thông tin thất bại!', 'Chỉnh sửa');
//   });
// }

  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
