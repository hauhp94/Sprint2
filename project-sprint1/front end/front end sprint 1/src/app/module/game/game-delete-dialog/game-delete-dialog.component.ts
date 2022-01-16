import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GameService} from '../../../service/game/game.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-game-delete-dialog',
  templateUrl: './game-delete-dialog.component.html',
  styleUrls: ['./game-delete-dialog.component.css']
})
export class GameDeleteDialogComponent implements OnInit {
  // Creator: Thúy
  public id: number;
  public name: string;

  constructor(public dialogRef: MatDialogRef<GameDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public gameService: GameService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.id = this.data.game.gameId;
    this.name = this.data.game.name;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete() {
    this.gameService.deleteGame(this.id).subscribe(() => {
      this.dialogRef.close();
      this.toast.success('Delete game successfully!', 'Delete game');
    }, error => {
      this.toast.error('Delete failed game.', 'Delete game');
      this.dialogRef.close();
    });
  }
}
