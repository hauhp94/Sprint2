import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../model/customer/Customer';
import {CustomerService} from '../../../service/customer/customer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';
import {Title} from '@angular/platform-browser';
import {Gender} from '../../../model/gender/gender';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  public editCustomerForm: FormGroup;
  public customer: Customer;
  public customer1: Customer;
  public gender: any;
  private customerId: number;
  imageCustomer: string;
  private selectedImage: any;
  listGender: Gender[] = [];

  constructor(private customerService: CustomerService,
              private router: Router,
              private toastrService: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
              private titleService: Title,
              public activatedRoute: ActivatedRoute) {
    this.titleService.setTitle('Cập nhật khách hàng');
    this.editCustomerForm = new FormGroup({
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
    this.findCustomer();
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

  editCustomer() {
    const customer = this.editCustomerForm.value;
    customer.customerId = this.customer1.customerId;
    console.log(customer);
    this.customerService.editCustomer(customer).subscribe(() => {
      this.toastrService.success('Cập nhật khách hàng thành công!!!');
      this.editCustomerForm.reset();
      this.router.navigateByUrl('/customer/list');
    });
  }

  private findCustomer() {
    this.customerId = Number(this.activatedRoute.snapshot.params.id);
    this.customerService.findByIdLinh(this.customerId).subscribe(data2 => {
      console.log(data2);
      this.customer1 = data2;
      this.editCustomerForm.patchValue(this.customer1);
      this.imageCustomer = data2.image;
    });
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage !== this.imageCustomer) {
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
          this.editCustomerForm.value.image = url;
          this.imageCustomer = url;
          Swal.close();
        });
      })
    ).subscribe();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  back() {
    this.customer = this.editCustomerForm.value;
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.editCustomerForm.patchValue(this.customer);
      }
    });
  }

  reset() {
    this.customer = this.editCustomerForm.value;
    Swal.fire({
      title: 'Bạn muốn khôi phục mặc định',
      text: 'Thay đổi sẽ không được lưu',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Không',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then((result) => {
      if (result.value) {
        this.findCustomer();
        this.toastrService.success('Dữ liệu khách hàng đã khôi phục');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.editCustomerForm.patchValue(this.customer1);
      }
    });
  }

  get newsImageName() {
    return this.editCustomerForm.get('image');
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.unitId === c2.unitId : c1 === c2;
  }
}
