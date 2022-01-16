import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastrService} from 'ngx-toastr';
import {Gender} from '../../../model/gender/gender';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
// @ts-ignore
import AutoNumeric = require('autonumeric');
import {CurrencyPipe} from '@angular/common';



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private storage: AngularFireStorage,
              private employeeService: EmployeeService,
              private router: Router,
              private titleService: Title,
              private toast: ToastrService,
              private currencyPipe: CurrencyPipe) {
    this.titleService.setTitle('Tạo mới nhân viên');
    // alert(this.salary.
    // toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
  }

  salary = 0;
  employeeForm: FormGroup;
  genderList: Gender[];

  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  imgSrc: string;
  check = false;
  checkImg = true;
  msgExistCode = '';
  msgExistUsername = '';
  msgValidate: any;
  formattedAmount: any;

  ngOnInit(): void {
    this.employeeService.getGenderList().subscribe(value => this.genderList = value);
    this.employeeForm = new FormGroup({
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
        username: new FormControl('', Validators.required),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
      }, this.conparePassword)
    });
  }

  createEmployee() {
    // alert(this.employeeForm.controls.salary.value);
    this.employeeService.save(this.employeeForm.value).subscribe(
      value => {
        // @ts-ignore
        if (value.status === false) {
          // @ts-ignore
          this.msgExistCode = value.msgExistCode;
          // @ts-ignore
          this.msgExistUsername = value.msgExistUsername;
          // @ts-ignore
          this.msgValidate = value.msgValidate;
          this.toast.error('Thêm mới nhân viên thất bại!');
        } else {
          this.toast.success('tạo mới thành công nhân viên! ' + this.employeeForm.value.name);
          this.router.navigateByUrl('employee/list');
        }
      }, error => this.toast.error('Có lỗi xảy ra, vui lòng thử lại!'));
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
              this.checkImg = false;
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

  conparePassword(c: AbstractControl): any {
    const v = c.value;
    return v.password === v.confirmPassword ? null : {passwordnotmatch: true};
  }


  changeInput(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
  }

  transformAmount(element) {
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'VNĐ');
    element.target.value = this.formattedAmount;
  }
}
