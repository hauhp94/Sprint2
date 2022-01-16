import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Gender} from '../../../model/gender/gender';
import {CustomerService} from '../../../service/customer/customer.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  createCustomerForm: FormGroup;
  listGender: Gender[] = [];
  image = '/assets/images/customerDefault.png';
  private selectedImage: any;
  public isImage = false;

  constructor(private customerService: CustomerService,
              private router: Router,
              private toastrService: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private titleService: Title) {
    this.titleService.setTitle('Tạo mới khách hàng');
    this.createCustomerForm = new FormGroup({
      customerCode: new FormControl('', [Validators.required, Validators.pattern('^KH-[0-9]*$')]),
      birthDate: new FormControl('', [Validators.required, this.checkDate]),
      phone: new FormControl('', [Validators.required,
        Validators.pattern('^84-[0-9]{9}$')]),
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      idCard: new FormControl('', Validators.required),
      image: new FormControl('', [Validators.required]),
    });
    this.customerService.getAllGender().subscribe(value => this.listGender = value);
  }

  ngOnInit(): void {
  }

  private checkDate(data: AbstractControl) {
    const date = data.value;
    const today = new Date();
    const dateOfBirth = new Date(date);
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    if (age >= 19) {
      return null;
    } else if (age === 18) {
      const m = today.getMonth() - dateOfBirth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dateOfBirth.getDate())) {
        return {invalidAge: true};
      }
      return null;
    } else {
      return {invalidAge: true};
    }
  }

  saveCustomer() {
    const customer = this.createCustomerForm.value;
    console.log(customer.flag);
    console.log(customer);
    this.customerService.saveCustomer(customer).subscribe(() => {
      this.toastrService.success('Tạo mới khách hàng thành công!!!');
      this.createCustomerForm.reset();
      this.router.navigateByUrl('customer/list');
    });
  }

  loadImg() {
    Swal.fire({
      title: 'Đang gửi dữ liệu',
      text: 'Vui lòng đợi ...',
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
          this.createCustomerForm.value.image = url;
          this.image = url;
          this.isImage = true;
          Swal.close();
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage !== this.image) {
      this.loadImg();
    }
  }

  get newsImageName() {
    return this.createCustomerForm.get('image');
  }

  back() {
    Swal.fire({
      title: 'Trở về danh sách khách hàng',
      text: 'Thay đổi sẽ không được lưu.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Đồng Ý',
      cancelButtonText: 'Từ Chối',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('customer/list');
      }
    });
  }

  /*get newsImageName() {
    return this.createForm.get('image');
  }*/
}
