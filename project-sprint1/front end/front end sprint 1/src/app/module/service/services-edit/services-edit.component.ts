import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../model/service/unit';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ServiceService} from '../../../service/service/service.service';
import Swal from 'sweetalert2';
import Swal2 from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {Services} from '../../../model/service/services';

@Component({
  selector: 'app-services-edit',
  templateUrl: './services-edit.component.html',
  styleUrls: ['./services-edit.component.css']
})
export class ServicesEditComponent implements OnInit {
  editForm: FormGroup;
  id: number;
  unitList: any;
  selectedImage: any = null;
  services: Services;
  urlImage: any;
  isImage = false;
  listError: any = '';
  serviceForm: any;


  constructor(private service: ServiceService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private toast: ToastrService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe(p => {
      this.id = +p.get('id');
    });
    // this.id = this.activatedRoute.snapshot.params.id;
    // console.log(this.id);
  }

  ngOnInit(): void {
    this.getData();
    this.initForm();
    this.getService();
  }

  getData() {
    this.service.getAllUnit().subscribe(data => {
      this.unitList = data;
    });
  }

// Khanh create
  initForm() {
    this.editForm = new FormGroup({
      id: new FormControl(),
      code: new FormControl(''),
      name: new FormControl('', Validators.required),
      prices: new FormControl('', [Validators.required, Validators.min(1000), Validators.pattern('^\\d+$')]),
      quantity: new FormControl('', [Validators.required, this.validateInterger]),
      unit: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  getService() {
    this.service.findById(this.id).subscribe(data => {
      this.editForm.patchValue(data);
      // @ts-ignore
      this.urlImage = data.image;
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
          this.editForm.value.image = url;
          this.urlImage = url;
          this.isImage = true;
          Swal.close();
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage !== this.urlImage) {
      this.loadImg();
    }
  }

  edit() {
    this.services = this.editForm.value;
    this.service.update(this.id, this.services).subscribe(() => {
      this.route.navigateByUrl('/services/list').then(s => {
        this.showSuccess(),
          Swal.close();
      });
    }, e => {
      if (e.status === 400) {
        this.listError = e.error;
      }
      this.showError();
    });
  }

  validateInterger(abstractControl: AbstractControl) {
    return (abstractControl.value > 0 && abstractControl.value % 1 === 0) ? null : {checkInterger: true};
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.unitId === c2.unitId : c1 === c2;
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showSuccess() {
    this.toast.success('Editing is successful !', 'Notify : ');
  }

  showError() {
    this.toast.error('Edit failed !', 'Warning: ');
  }

  get newsImageName() {
    return this.editForm.get('image');
  }

  eedit($event: any) {
    this.edit();
  }

  reset1() {
    this.serviceForm = this.editForm.value;

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
        this.getService();

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.editForm.patchValue(this.serviceForm);
      }
    });
  }

  back() {
    this.serviceForm = this.editForm.value;
    Swal2.fire({
      title: 'Are you sure back to service list ?',
      text: 'Changes will not be saved !',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then((result) => {
      if (result.value) {
        this.route.navigateByUrl('/services/list');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.editForm.patchValue(this.serviceForm);
      }
    });
  }

}
