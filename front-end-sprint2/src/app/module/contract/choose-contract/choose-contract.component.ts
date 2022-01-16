import {Component, Inject, OnInit} from '@angular/core';
import {ContractService} from '../../../service/contract/contract.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Contract} from '../../../model/contract/contract';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-choose-contract',
  templateUrl: './choose-contract.component.html',
  styleUrls: ['./choose-contract.component.css']
})
export class ChooseContractComponent implements OnInit {
  listContract: Contract[];
  page = 0;
  totalPage: number;
  code: string;
  name: string;
  product: string;
  date: string;
  searchForm: FormGroup;
  flagSearch = false;

  constructor(private contractService: ContractService,
              @Inject(MAT_DIALOG_DATA) public data: Contract,
              public dialogRef: MatDialogRef<ChooseContractComponent>) {
  }

  ngOnInit(): void {
    this.getListContract();
    this.searchForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl(''),
      product: new FormControl(''),
      date: new FormControl('')
    });
  }

  getListContract() {
    this.contractService.getListContract(this.page).subscribe(value => {
      // @ts-ignore
      this.listContract = value.content;
      // @ts-ignore
      this.totalPage = value.totalPages;
    }, error => {
      this.listContract = null;
    });
  }

  closeDiablog() {
    this.dialogRef.close();
  }

  chooseContract(c: any) {
    this.dialogRef.close(c);
  }

  searchContract() {
    this.flagSearch = true;
    this.contractService.searchContract(this.searchForm.value.code, this.searchForm.value.name,
      this.searchForm.value.product, this.searchForm.value.date, this.page).subscribe(value => {
      // @ts-ignore
      this.listContract = value.content;
    }, error => {
      this.listContract = null;
    });
  }


  goNextPage() {
    this.page = this.page + 1;
    if (this.flagSearch) {
      this.searchContract();
    } else {
      this.getListContract();
    }

  }

  goPreviousPage() {
    this.page = this.page - 1;
    if (this.flagSearch) {
      this.searchContract();
    } else {
      this.getListContract();
    }
  }

  goPage(target: EventTarget) {
    // @ts-ignore
    this.page = target - 1;
    this.getListContract();
  }
}
