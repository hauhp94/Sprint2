import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DeleteServicesComponent} from '../delete-services/delete-services.component';
import {ToastrService} from 'ngx-toastr';
import {Services} from '../../../model/service/services';
import {ServiceService} from '../../../service/service/service.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {GameService} from "../../../service/game/game.service";
import {GameTypeService} from "../../../service/game/gameType/game-type.service";
import {Title} from "@angular/platform-browser";


@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  public servicesPage: any;
  public name = '';
  public name2 = '';
  public p = 0;
  public code = '';
  public prices = '';
  public messenger = '';
  public check = 0;
  public checkNumber = true;
  public inputPage = '';
  public deleteServicesId: Array<number> = [];
  public deleteServicesCode: Array<string> = [];
  searchAllForm: FormGroup;
  searchNameCodePrice: FormGroup;
  ps: Array<any> = [];
  private roles: string[];
  isLogged = false;
  showAdminBoard = false;

  constructor(private tokenStorageService: TokenStorageService, private dialog: MatDialog,
              private toast: ToastrService,
              private serviceService: ServiceService) {

    this.getSearchAllFrom();
    this.getSearchCodeNamePrice();
  }

  ngOnInit(): void {
    this.isLogged = !!this.tokenStorageService.getToken();

    if (this.isLogged) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')){
        this.showAdminBoard = true;
      }
      this.getAllServicesList();
    }
  }

  getSearchAllFrom() {
    this.searchAllForm = new FormGroup({
        name: new FormControl('', Validators.maxLength(50))
      }
    )
  }

  getSearchCodeNamePrice() {
    this.searchNameCodePrice = new FormGroup({
      name2: new FormControl('', Validators.maxLength(50)),
      code: new FormControl('', Validators.maxLength(50)),
      prices: new FormControl('', Validators.maxLength(50))
    })
  }

  // phap
  deleteArr(id: number, code: string) {
    for (let i = 0; i < this.deleteServicesId.length; i++) {
      if (this.deleteServicesId[i] === id) {
        this.deleteServicesId.splice(i, 1);
        this.deleteServicesCode.splice(i, 1);
        return;
      }
    }
    this.deleteServicesId.push(id);
    this.deleteServicesCode.push(code);
    console.log("code " + this.deleteServicesCode);
    console.log("id " + this.deleteServicesId);
  }


// phap
  getAllServicesList() {
    console.log(this.name);
    this.serviceService.getAllServices(this.name, this.p).subscribe(value => {
      this.check = 0;
      if (value == null) {
        this.ps = [];
        this.servicesPage = [];
        this.messenger = "List is empty";
        this.p = 0;
        return;
      } else if (value.content.length == 0 && value.totalPages > 0) {
        this.servicesPage = [];
        console.log(value);
        this.p = 0;
        this.getAllServicesList();

      }
      this.servicesPage = value.content;
      for (let i = 0; i < this.servicesPage.length; i++) {
        for (let j = 0; j < this.deleteServicesId.length; j++) {
          if (this.servicesPage[i].servicesId === this.deleteServicesId[j]) {
            this.servicesPage[i].flag = 3;
            break;
          }
        }
      }
      this.ps = new Array<any>(value.totalPages);
      console.log(this.servicesPage);
    }, error => {
      console.log(error);
    });
  }

// phap
  searchNameCodePrices() {
    this.serviceService.searchNameCode(this.code, this.name2, this.prices, this.p).subscribe(value => {
      this.check = 1;
      console.log(value);
      if (value.content.length == 0 && value.totalPages == 0) {
        this.ps = [];
        this.servicesPage = [];
        this.messenger = 'List is empty';
        this.p = 0;
      } else if (value.content.length == 0 && value.totalPages > 0) {
        console.log(value);
        this.servicesPage = [];
        this.messenger = 'List is empty';
        this.p = 0;
        this.searchNameCodePrices();
      }
      this.servicesPage = value.content;
      for (let i = 0; i < this.servicesPage.length; i++) {
        for (let j = 0; j < this.deleteServicesId.length; j++) {
          if (this.servicesPage[i].servicesId === this.deleteServicesId[j]) {
            this.servicesPage[i].flag = 3;
            break;
          }
        }
      }
      this.ps = new Array<any>(value.totalPages);

      console.log(this.servicesPage);
    }, error => {
      console.log(error);
    });
  }

// phap
  first() {
    if (this.check === 0) {
      this.p = 0;
      this.getAllServicesList();
    } else {
      this.p = 0;
      this.searchNameCodePrices();
    }
  }

// phap
  last() {
    if (this.check === 0) {
      this.p = this.ps.length - 1;
      this.getAllServicesList();
    } else {
      this.p = this.ps.length - 1;
      this.searchNameCodePrices();
    }

  }

// phap
  previous() {
    if (this.p <= 0) {
      if (this.check === 0) {
        this.p = 0;
        this.getAllServicesList();
      } else {
        this.p = 0;
        this.searchNameCodePrices();
      }
    } else {
      if (this.check === 0) {
        this.p = this.p - 1;
        this.getAllServicesList();
      } else {
        this.p = this.p - 1;
        this.searchNameCodePrices();
      }

    }

  }

// phap
  next() {
    console.log(this.ps.length);
    if (this.p > this.ps.length - 2) {
      if (this.check === 0) {
        this.p = this.ps.length - 1;
        this.getAllServicesList();
      } else {
        this.p = this.ps.length - 1;
        this.searchNameCodePrices();
      }
    } else {
      console.log(this.p);
      if (this.check === 0) {
        this.p = this.p + 1;
        console.log(this.p);
        this.getAllServicesList();
      } else {
        this.p = this.p + 1;
        this.searchNameCodePrices();
      }

      console.log(this.p);
    }

  }

// phap
  openDialogAll(): void {
    const dialogRef = this.dialog.open(DeleteServicesComponent, {
      width: '500px',
      height: '360px',
      panelClass: 'config-dialog',
      data: {id: this.deleteServicesId, code: this.deleteServicesCode},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {

      } else {
        this.deleteServicesId = [];
        this.deleteServicesCode = [];
      }
      this.ngOnInit();
    }, error => {
      this.toast.error('Delete failed.', 'Delete Services')
    });
  }


  // phap
  openDialog(id: any): void {
    this.serviceService.findById(id).subscribe(dataDialog => {
      const dialogRef = this.dialog.open(DeleteServicesComponent, {
        width: '500px',
        height: '360px',
        data: {name: dataDialog},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }


// phap
  changePage(event: any) {
    this.checkNumber = !isNaN(event.target.value);
    if (Number(event.target.value) - 1 < this.ps.length - 2) {
      this.first();
    } else if (Number(event.target.value) > this.ps.length - 1) {
      this.last();
    } else if (this.check === 0) {
      this.p = (Number(event.target.value) - 1);
      this.getAllServicesList();
    } else {
      this.p = Number(event.target.value);
      console.log(this.p);
      this.searchNameCodePrices();
    }
  }

  resetForm() {

    this.code = '';
    this.name2 = '';
    this.prices = '';
    this.name = '';
    this.p = 0;
    this.searchAllForm = new FormGroup({
      name: new FormControl('', Validators.maxLength(50))
    })
    this.searchNameCodePrice = new FormGroup({
      name2: new FormControl('', Validators.maxLength(50)),
      code: new FormControl('', Validators.maxLength(50)),
      prices: new FormControl('', Validators.maxLength(50))
    })
    this.getAllServicesList();
  }

  changePrice2(event: KeyboardEvent) {
    // @ts-ignore
    this.changePrice = event.target.value;
  }
}
