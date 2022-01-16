import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServiceService} from '../../../service/service/service.service';
import {ToastrService} from 'ngx-toastr';
import {Services} from '../../../model/service/services';
import {Router} from '@angular/router';
import {Unit} from '../../../model/service/unit';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-services-create',
  templateUrl: './services-create.component.html',
  styleUrls: ['./services-create.component.css']
})
export class ServicesCreateComponent implements OnInit {
  createForm: FormGroup;
  servicesList: any;
  unitList: any;
  code = 'SV-0001';
  lastId: number;
  selectedImage: any = null;
  services: Services;
  urlImage: string;
  serviceForm: any;
  public isImage = false;
  page: number;
  name: string;
  listError: any = '';
  changePrice = '';
  constructor(private serviceService: ServiceService,
              private toast: ToastrService,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage,
  ) {
  }

  ngOnInit(): void {
    this.getData();
    this.getInit();
  }

  getData() {
    this.serviceService.getAllServices(this.name, this.page).subscribe(data => {
      this.servicesList = data;
      if (this.servicesList && this.servicesList.length < 1) {
        this.lastId = this.servicesList[this.servicesList.length - 1].servicesId;
        if (this.lastId < 10) {
          this.code = 'SV-000' + this.lastId;
        } else if (this.lastId < 100) {
          this.code = 'SV-00' + this.lastId;
        } else if (this.lastId < 1000) {
          this.code = 'SV-0' + this.lastId;
        } else {
          this.code = 'SV-' + this.lastId;
        }
      }
    });
    this.serviceService.getAllUnit().subscribe(data => {
      this.unitList = data;
    });
  }

  getInit() {
    this.createForm = new FormGroup({
      id: new FormControl(),
      code: new FormControl(this.code),
      name: new FormControl('', Validators.required),
      prices: new FormControl('', [Validators.required, Validators.min(1000), Validators.pattern('^\\d+$')]),
      quantity: new FormControl('', [Validators.required, this.validateInterger]),
      unit: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  create() {
    this.createForm.value.image = this.urlImage;
    this.serviceService.create(this.createForm.value).subscribe(data => {
      this.router.navigateByUrl('/services/list');
      this.showSuccess();
    }, error => {
      if (error.status === 400) {
        this.listError = error.error;

      }
      this.showError();
    });

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
          console.log(url);
          this.createForm.value.image = url;
          this.urlImage = url;
          console.log(this.urlImage);
          this.isImage = true;
          Swal.close();
        });
      })
    ).subscribe();
  }

  validateInterger(abstractControl: AbstractControl) {
    return (abstractControl.value > 0 && abstractControl.value % 1 === 0) ? null : {checkInterger: true};
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage !== null) {
      this.loadImg();
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showSuccess() {
    this.toast.success('Successfully added new !', 'Notify : ');
  }

  showError() {
    this.toast.error('Add new failure !', 'Warning : ');
  }

  get newsImageName() {
    return this.createForm.get('image');
  }


  reset() {
    this.serviceForm = this.createForm.value;
    Swal.fire({
      title: 'Are you sure to reset?',
      text: 'This action cannot be undone !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.isImage = false;
        this.urlImage = '';
        this.getInit();
      }
    });
  }

  back() {
    this.serviceForm = this.createForm.value;
    Swal.fire({
      title: 'Are you sure back to service list?',
      text: 'Changes will not be saved !',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('/services/list');
      }
    });
  }
  changePrice2(event: KeyboardEvent) {
    // @ts-ignore
    this.changePrice = event.target.value;
  }
}
