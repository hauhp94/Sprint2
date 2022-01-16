import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GameType} from '../../../model/game/game-type';
import {AppComponent} from '../../../app.component';
import {GameService} from '../../../service/game/game.service';
import {GameTypeService} from '../../../service/game/gameType/game-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import {finalize} from 'rxjs/operators';
import {Game} from '../../../model/game/game';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.css']
})
export class GameEditComponent implements OnInit {
  public Editor = ClassicEditor;
  public gameForm: FormGroup;
  public game: Game;
  public gameType: any;
  private gameId: number;
  imageGame: string;
  private selectedImage: any;
  listError: any = '';
  @ViewChild('nameinput') private elementRef: ElementRef;
  changeGaming = '';

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  constructor(@Inject(AngularFireStorage) private storage: AngularFireStorage,
              private appComponent: AppComponent,
              private gameService: GameService,
              private gameTypeService: GameTypeService,
              public activatedRoute: ActivatedRoute,
              public router: Router, private toastr: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('Edit game');
  }

  ngOnInit(): void {
    this.initfrom();
    this.getAllGameType();
    this.findGame();
  }

  initfrom() {
    this.gameForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(40)]),
      trailer: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
      image: new FormControl('', [Validators.required]),
      gaming: new FormControl('', [Validators.required, Validators.pattern("^\\d+$")]),
      gameType: new FormControl('', [Validators.required]),
    });
  }

  findGame() {
    this.activatedRoute.params.subscribe(data => {
      this.gameId = data.id;
      this.gameService.getById(this.gameId).subscribe(data2 => {
        this.gameForm.patchValue(data2);
        this.imageGame = data2.image;
      });
    }, error => {
      this.toastr.error('Warning!', 'Game not found!');
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
          this.imageGame = url;
          Swal.close();
        });
      })
    ).subscribe();
  }


  editGame() {
    this.gameService.updateGame(this.gameId, this.gameForm.value,).subscribe(data => {
      this.router.navigateByUrl('');
      this.toastr.success('Thanks!', 'Edit game successfully!');
    }, error => {
      if (error.status === 400) {
        this.listError = error.error;
      }
      this.toastr.error('Warning!', 'Edit game fail!');
    });
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    if (this.selectedImage !== this.imageGame) {
      this.loadImg();
    }
  }

  get newsImageName() {
    return this.gameForm.get('image');
  }

  reset() {
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
        this.findGame();
        this.toastr.success('Thanks!', 'Reset game successfully!');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.gameForm.patchValue(this.game);
      }
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.gameForm.patchValue(this.game);
      }
    });
  }
}
