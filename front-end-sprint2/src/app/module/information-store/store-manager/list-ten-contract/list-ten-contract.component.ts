import {Component, OnInit} from '@angular/core';
import {Contract} from '../../../../model/contract/contract';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ContractService} from '../../../../service/contract/contract.service';
import {DeleteContractComponent} from '../../../contract/delete-contract/delete-contract.component';
import {DetailContractComponent} from '../../../contract/detail-contract/detail-contract.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-ten-contract',
  templateUrl: './list-ten-contract.component.html',
  styleUrls: ['./list-ten-contract.component.css']
})
export class ListTenContractComponent implements OnInit {

  contract: Contract;
  contracts: Contract[] = [];
  page: number;
  listStatusContract: any;
  listTypeContract: any;
  totalPage = 0;
  flagSearch: number;
  name: string;
  status: string;
  ps: Array<any> = [];
  check = 0;
  searchContractFrom: FormGroup;

  constructor(private dialog: MatDialog, private contractService: ContractService, private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.page = 0;
    this.getAllContract();
    this.getAllStatusContract();
    this.getAllTypeContract();
    this.searchContractFrom = new FormGroup({
      customer: new FormControl(),
      statusContract: new FormControl(),
    });
  }

  getAllContract() {
    this.contractService.getAll10Contract().subscribe(data => {
      this.contracts = data;
    });
    console.log('day la list10:' + JSON.stringify(this.contracts));
  }

  getAllStatusContract() {
    this.contractService.getAllStatusContract().subscribe(data => {
      this.listStatusContract = data;
      console.log(this.listStatusContract);
    });
  }

  getAllTypeContract() {
    this.contractService.getAllTypeContract().subscribe(data => {
      this.listTypeContract = data;
    });
  }

  onDeleteHandler(contract: Contract) {
    const dialogRef = this.dialog.open(DeleteContractComponent, {
      data: this.contract,
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contractService.deleteContractById(this.contract.contractId).subscribe(data => {
          this.getAllContract();
        });
      }
    });
  }

  searchContract() {
    this.contractService.searchNameStatus(this.name, this.status).subscribe(data => {
      this.contracts = data;
    }, error => {
      this.toast.error('Không tìm thấy dữ liệu', 'Thông báo');
      this.getAllContract();
    });
  }

  openDialogDetail(contract: Contract) {
    const dialogRef = this.dialog.open(DetailContractComponent, {
      data: contract,
      width: '700px'
    });
  }

  onDeleteContract(contractCode: string, name: string, contractId: number) {

    const dialogRef = this.dialog.open(DeleteContractComponent, {
      panelClass: 'dialog-container-custom',
      width: '500px',
      data: {
        nameCustomer: name,
        nameContractCode: contractCode,
        idContract: contractId
      }
    });
    console.log('day la contractId ' + contractId);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contractService.deleteContractById(contractId).subscribe(data => {
          this.getAllContract();
        });
      }
    });
  }

  previous() {
    if (this.page <= 0) {
      if (this.check === 0) {
        this.page = 0;
        this.getAllContract();
      } else {
        this.page = 0;
        this.searchContract();
      }
    } else {
      if (this.check === 0) {
        this.page = this.page - 1;
        this.getAllContract();
      } else {
        this.page = this.page - 1;
        this.searchContract();
      }

    }

  }


  next() {
    console.log(this.ps.length);
    if (this.page > this.ps.length - 2) {
      if (this.check === 0) {
        this.page = this.ps.length - 1;
        this.getAllContract();
      } else {
        this.page = this.ps.length - 1;
        this.searchContract();
      }
    } else {
      console.log(this.page);
      if (this.check === 0) {
        this.page = this.page + 1;
        this.getAllContract();
      } else {
        this.page = this.page + 1;
        this.searchContract();
      }
    }

  }

}
