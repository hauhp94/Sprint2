import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from '../../../app.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GameType} from '../../../model/game/game-type';
import {GameService} from '../../../service/game/game.service';
import {GameTypeService} from '../../../service/game/gameType/game-type.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import {Game} from '../../../model/game/game';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {
  public Editor = ClassicEditor;
  public gameForm: FormGroup;
  public gameType: any;
  image: string;
  private selectedImage: any;
  public isImage = false;
  listError: any = '';
  public game: Game;
  public changeGaming = '';

  @ViewChild('nameinput') private elementRef: ElementRef;

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private appComponent: AppComponent,
              private gameService: GameService,
              private gameTypeService: GameTypeService,
              public router: Router, private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Create game');
  }

  ngOnInit(): void {
    this.initfrom();
    this.getAllGameType();
  }


  initfrom() {
    this.gameForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      trailer: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.maxLength(2007)]),
      image: new FormControl('', [Validators.required]),
      gaming: new FormControl('', [Validators.required, Validators.pattern("^\\d+$")]),
      gameType: new FormControl('', [Validators.required]),
    });
  }

  getAllGameType() {
    this.gameTypeService.getAllGameType().subscribe(data => {
      this.gameType = data;
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
          this.gameForm.value.image = url;
          this.image = url;
          this.isImage = true;
          Swal.close();
        });
      })
    ).subscribe();
  }

  save() {
    this.gameForm.value.image = this.image;
    this.gameService.saveGame(this.gameForm.value).subscribe(data => {
      this.router.navigateByUrl('');
      this.toastr.success('Thanks!', 'Create new game successfully!');
    }, error => {
      if (error.status === 400) {
        this.listError = error.error;
        console.log(error);
      }
      this.toastr.error('Warning!', 'Create new game fail!');
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
    return this.gameForm.get('image');
  }

  resetValue() {
    this.game = this.gameForm.value;
    Swal.fire({
      title: 'Are you sure to reset?',
      text: 'This action cannot be undone !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then((result) => {
      if (result.value) {
        this.isImage = false;
        this.image = '';
        this.initfrom();
        this.toastr.success('Thanks!', 'Reset game successfully!');
      }
    });
  }

  back() {
    this.game = this.gameForm.value;
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
