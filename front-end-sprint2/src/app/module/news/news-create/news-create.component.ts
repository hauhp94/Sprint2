import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {News} from '../../../model/news/news';
import {AngularFireStorage} from '@angular/fire/storage';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {NewsService} from '../../../service/news/news.service';
import {AppComponent} from '../../../app.component';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {
  public Editor = ClassicEditor;
  public newsForm: FormGroup;
  image: string;
  private selectedImage: any;
  public isImage = false;
  listError: any = '';
  public news: News;
  public changeGaming = '';

  isLoggedIn = false;


  @ViewChild('nameinput') private elementRef: ElementRef;

  // tslint:disable-next-line:use-lifecycle-interface
  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private appComponent: AppComponent,
              private newsService: NewsService,
              public router: Router, private toastr: ToastrService,
              private titleService: Title,
              private tokenStorageService: TokenStorageService) {
    this.titleService.setTitle('Tạo mới tin tức');
  }

  ngOnInit(): void {
    this.initfrom();
  }


  initfrom() {
    this.newsForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(500)]),
      image: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.maxLength(2007)]),
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
          this.newsForm.value.image = url;
          this.image = url;
          this.isImage = true;
          Swal.close();
        });
      })
    ).subscribe();
  }

  save() {
    this.newsForm.value.image = this.image;
    this.newsService.saveGame(this.newsForm.value).subscribe(data => {
      this.router.navigateByUrl('/news/list');
      this.toastr.success('Tạo mới thành công', 'Tạo mới');
    }, error => {
      if (error.status === 400) {
        this.listError = error.error;
        console.log(error);
      }
      this.toastr.error('Tạo mới thất bại', 'Tạo mới');
    });
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
    return this.newsForm.get('image');
  }
  back() {
    this.news = this.newsForm.value;
    Swal.fire({
      title: 'Are you sure back to home?',
      text: 'Changes will not be saved !',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then((result) => {
      if (result.value) {
        this.router.navigateByUrl('');
      }
    });
  }

}
