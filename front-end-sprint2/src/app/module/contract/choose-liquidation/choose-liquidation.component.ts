import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ContractService} from '../../../service/contract/contract.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Contract} from '../../../model/contract/contract';
import {TypeProduct} from '../../../model/contract/type-product';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-choose-liquidation',
  templateUrl: './choose-liquidation.component.html',
  styleUrls: ['./choose-liquidation.component.css']
})
export class ChooseLiquidationComponent implements OnInit {
  productListPage: Contract[] = [];
  p = 0;
  check = 0;
  nameProduct = '';
  nameTypeProduct = '';
  listTypeProduct: TypeProduct[] = [];
  loan: number;
  ps: Array<any> = [];
  searchPageInput: number;
  listContractId = [];



  constructor(private contractService: ContractService,
              private dialog: MatDialog) {

    /*console.log(this.productListPage);*/
  }

  ngOnInit(): void {
    this.getAllTypeProduct();
    this.getAllLiquidationProduct();
  }

  getAllTypeProduct() {
    this.contractService.getAllTypeProductL().subscribe(value => {
      this.listTypeProduct = value;
    });
  }

  getAllLiquidationProduct() {
    if (this.check == 1) {
      this.contractService.searchContracts(this.nameProduct, this.nameTypeProduct, this.loan, this.p).subscribe(value => {
        console.log(value.content);
        this.productListPage = value.content;
        this.ps = new Array<any>(value.totalPages);
        console.log(this.productListPage);
      });
    } else {
      this.contractService.getProductsLiquidation(this.p).subscribe(value => {
        this.productListPage = value.content;
        this.ps = new Array<any>(value.totalPages);
      });
    }
  }

  searchPage() {
    this.p = this.searchPageInput - 1;
    this.getAllLiquidationProduct();
  }

  previousPage() {
    this.p = this.p - 1;
    this.getAllLiquidationProduct();
    this.ngOnInit();
  }

  nextPage() {
    this.p = this.p + 1;
    this.getAllLiquidationProduct();
    this.ngOnInit();
  }

  searchProducts() {
    this.p = 0;
    this.check=1;
    this.getAllLiquidationProduct();
  }

  chooseHidden(id: number) {
    for (let i = 0; i < this.listContractId.length; i++) {
      if (this.listContractId[i] == id) {
        this.listContractId.splice(i, 1);
      }
    }
    this.listContractId.push(id);
    console.log(this.listContractId);
    this.contractService.setStatusLiquidById(id, 3).subscribe();
    this.getAllLiquidationProduct();
    this.ngOnInit();
    this.contractService.sendData(this.listContractId);
  }


  cancel() {
    for (let i = 0; i < this.listContractId.length; i++) {
      this.contractService.setStatusLiquidById(this.listContractId[i], 1).subscribe();
    }
    this.listContractId = [];
    this.contractService.resetData();
    this.dialog.closeAll();
  }

  createListId() {
    this.dialog.closeAll();
    console.log(this.listContractId);

  }
}


