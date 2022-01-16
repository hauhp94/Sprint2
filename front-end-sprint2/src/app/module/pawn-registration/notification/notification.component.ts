import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ListPawnRegistrationComponent} from '../list-pawn-registration/list-pawn-registration.component';
import * as empty from 'firebase/empty-import';
import {TokenStorageService} from '../../../service/security/token-storage.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  @Input()
  notificationValue: boolean;

  @Input()
  countValue: number;

  @Output()
  notificationChange: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  countChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ListPawnRegistrationComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });

    this.notificationValue = false;
    this.countValue = 0;

    this.notificationChange.emit(this.notificationValue)
    this.countChange.emit(this.countValue)
  }
}
