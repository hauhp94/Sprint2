import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ContractService} from '../../../service/contract/contract.service';
import {Contract} from '../../../model/contract/contract';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-detail-contract',
  templateUrl: './detail-contract.component.html',
  styleUrls: ['./detail-contract.component.css']
})
export class DetailContractComponent implements OnInit {
  date1: any;

  constructor(public  dialogRef: MatDialogRef<DetailContractComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public contractService: ContractService,
              private router: Router,
              private dialog: MatDialog) {
    console.log(this.data);

  }

  ngOnInit(): void {
     const el: HTMLElement = document.getElementById('content');
     const dateCheckOut = this.data.endDate;
     const dateToBeCheckOut = new Date(dateCheckOut);
    const statusContract = this.data.statusContract.name;
     const today = new Date();
     if (dateToBeCheckOut.getDate() < today.getDate() && dateToBeCheckOut.getMonth() <= today.getMonth()&& statusContract === 'Đã cầm đồ') {
       el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  }

  sendContract(data: any) {
    this.contractService.sendContract(data);
    this.dialog.closeAll();
    this.router.navigateByUrl('/create-liquidation-contract');
    console.log(this.contractService.contract);
  }
}
