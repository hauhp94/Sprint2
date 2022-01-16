import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PawnRegistration} from '../../../model/pawn-registration/pawn-registration';
import {PawnRegistrationService} from '../../../service/pawn-registration/pawn-registration.service';
import {ToastrService} from 'ngx-toastr';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-pawn-registration',
  templateUrl: './list-pawn-registration.component.html',
  styleUrls: ['./list-pawn-registration.component.css']
})
export class ListPawnRegistrationComponent implements OnInit {

  pawnRegistrationList: PawnRegistration[];
  totalPage = 0;
  page: number;
  flagSearch: number;

  constructor(public dialogRef: MatDialogRef<ListPawnRegistrationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public pawnRegistrationService: PawnRegistrationService,
              public toast: ToastrService) { }

  ngOnInit(): void {
    this.page = 0;
    this.flagSearch = 0;
    this.getPawnRegistrationList(this.page);
  }

  getPawnRegistrationList(page: number) {
    this.pawnRegistrationService.getAllPawnRegistration(page).subscribe(data => {
      this.pawnRegistrationList = data.content;
      this.totalPage = data.totalPages;
      console.log(this.totalPage);
    }, error => {
      this.toast.info('Không có thông tin khách hàng', 'Thông báo');
    });
  }

  close() {
    this.dialogRef.close();
  }

  goPreviousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    this.getPawnRegistrationList(this.page);
  }

  goNextPage() {
    if (this.page < this.totalPage - 1) {
      this.page++;
    }

    this.getPawnRegistrationList(this.page);
  }

  confirm(id: number) {
    this.pawnRegistrationService.edit(id).subscribe(()=> {
      this.getPawnRegistrationList(this.page);
    });
  }
}
