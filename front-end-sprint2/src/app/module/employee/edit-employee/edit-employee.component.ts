import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {EmployeeService} from '../../../service/employee/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Gender} from '../../../model/gender/gender';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Employee} from '../../../model/employee/employee';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  gender: Gender;
  id: number;
  employee: Employee;

  genderList: Gender[];

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  imgSrc: string;
  check = false;

  employeeForm = new FormGroup({
    employeeId: new FormControl(''),
    employeeCode: new FormControl('', [Validators.required, Validators.pattern('^NV-\\d{4}$')]),
    salary: new FormControl('', [Validators.required, Validators.min(1000000)]),
    idCard: new FormControl('', [Validators.required, Validators.minLength(9)]),
    name: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern('^0[0-9]{8,9}$')]),
    genderDto: new FormControl('', Validators.required),
    flag: new FormControl('0'),
    accountDto: new FormGroup({
      accountId: new FormControl(''),
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, this.conparePassword)
  });
  salary = 0;

  constructor(private storage: AngularFireStorage,
              private employeeService: EmployeeService,
              private router: Router,
              private titleService: Title,
              private activatedRoute: ActivatedRoute,
              private toast: ToastrService
  ) {
    this.titleService.setTitle('Cập nhật nhân viên');
    this.id = Number(this.activatedRoute.snapshot.params.id);
    this.employeeService.getGenderList().subscribe(value => {
        this.genderList = value;
      },
      error => alert('loi get list gender'));
  }

  ngOnInit(): void {
    this.getEmployee();
  }

  getEmployee(): void {
    this.employeeService.findById(this.id).subscribe(value => {
      this.employee = value;
      this.employeeForm.patchValue(value);
      this.employeeForm.controls.accountDto.get('accountId').setValue(value.account.accountId);
      this.employeeForm.controls.accountDto.get('username').setValue(value.account.username);
      // this.employeeForm.controls.accountDto.get('password').setValue(value.account.password);
      // this.employeeForm.controls.accountDto.get('confirmPassword').setValue(value.account.password);
      this.employeeForm.controls.genderDto.setValue(value.gender);
      this.gender = value.gender;
      this.imgSrc = value.image;
    }, error => this.toast.error('không tìm thấy nhân viên!'));
  }

  conparePassword(c: AbstractControl): any {
    const v = c.value;
    return v.password === v.confirmPassword ? null : {passwordnotmatch: true};
  }

  editEmployee() {
    this.employeeService.update(this.employeeForm.value).subscribe(
      value => {
        this.toast.success('cập nhật thành công nhân viên! ' + this.employeeForm.value.name);
        this.router.navigateByUrl('employee/list');
      }, error => this.toast.error('có lỗi xảy ra!'));
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

  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}
