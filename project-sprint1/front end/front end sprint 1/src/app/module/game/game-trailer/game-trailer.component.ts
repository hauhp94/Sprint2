import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-game-trailer',
  templateUrl: './game-trailer.component.html',
  styleUrls: ['./game-trailer.component.css']
})
export class GameTrailerComponent implements OnInit {
  // Creator: Thúy
  @Input()
  public watchTrailer: string;
  urlSafe: SafeResourceUrl;

  constructor(public dialogRef: MatDialogRef<GameTrailerComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.watchTrailer = this.data.game.trailer;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.watchTrailer);
  }

  close(): void {
    this.dialogRef.close();
  }
}
