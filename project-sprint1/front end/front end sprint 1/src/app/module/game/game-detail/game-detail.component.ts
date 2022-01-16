import {Component, Inject, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  // Creator: Thúy
  public nameGame: string;
  public nameGameType: string;
  public contentGame: string;
  public gamingGame: string;
  @Input()
  public traileGame: string;
  public image: string;
  urlSafe: SafeResourceUrl;

  constructor(public dialogRef: MatDialogRef<GameDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.nameGame = this.data.game.name;
    this.nameGameType = this.data.game.gameType.name;
    this.contentGame = this.data.game.content;
    this.gamingGame = this.data.game.gaming;
    this.nameGame = this.data.game.name;
    this.traileGame = this.data.game.trailer;
    this.image = this.data.game.image;
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.traileGame);
  }

  close(): void {
    this.dialogRef.close();
  }
}
