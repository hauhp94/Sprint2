import {Component, OnInit} from '@angular/core';
import {PawnRegistrationService} from '../../../service/pawn-registration/pawn-registration.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TypeProduct} from '../../../model/contract/type-product';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-homepage-and-pawn-registration',
  templateUrl: './homepage-and-pawn-registration.component.html',
  styleUrls: ['./homepage-and-pawn-registration.component.css']
})
export class HomepageAndPawnRegistrationComponent implements OnInit {
  roles: string[];
  typeProductList: TypeProduct[];
  notification: boolean;
  count = 0;

  pawnRegistrationForm = new FormGroup({
    typeProduct: new FormControl('', [Validators.required]),
    nameCustomer: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(090|091|\\(84\\)\\+90|\\(84\\)\\+91)[0-9]{7}$')]),
    address: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required]),
  });
  isLoggedIn = false;
  username: string;
  showAdminBoard = false;
  showEmployeeBoard = false;
  hiddenNotification = true;

  constructor(private pawnRegistrationService: PawnRegistrationService,
              private router: Router,
              private toast: ToastrService,
              private tokenStorageService: TokenStorageService,
              private title: Title) {
    title.setTitle('Tiệm cầm đồ C03');
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.roles = user.roles;
      this.username = user.username;
      this.hiddenNotification = false;
    }else {
      this.hiddenNotification = true;
    }
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    this.pawnRegistrationService.getAllProduct().subscribe(data => {
      this.typeProductList = data;
    });
  }

  createPawn() {
    const pawnRegister = this.pawnRegistrationForm.value;
    this.pawnRegistrationService.createPawnRegistration(pawnRegister).subscribe(() => {
      this.pawnRegistrationForm.reset();
      this.getProduct();
      this.toast.success('Đăng ký thành công. Nhân viên tư vấn sẽ liên lạc bạn để xác nhận !!!', 'Thông báo');
      this.notification = true;
      this.count ++;
    }, error => {
      this.toast.error('Đăng ký thất bại !!!', 'Thông báo');
    });
  }

  receiveNotification($event) {
    this.notification = $event;
  }

  receiveCount($event) {
    this.count = $event;
  }
}
