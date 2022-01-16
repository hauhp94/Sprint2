import {Component, OnInit} from '@angular/core';
import {ComputerService} from '../../../service/computer/computer.service';
import {MatDialog} from '@angular/material/dialog';
import {Computer} from '../../../model/computer/computer';
import {ComputerType} from '../../../model/computer/type-computer';
import {ComputerStatus} from '../../../model/computer/status-computer';
import {ComputerManufacturer} from '../../../model/computer/manufacturer-computer';
import {ComputerDeleteComponent} from '../computer-delete/computer-delete.component';
import {ComputerListDeleteComponent} from '../computer-list-delete/computer-list-delete.component';
import {ToastrService} from 'ngx-toastr';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {GameService} from "../../../service/game/game.service";
import {GameTypeService} from "../../../service/game/gameType/game-type.service";


@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css'],
})

export class ComputerListComponent implements OnInit {
  listComputer: any;
  listComputerType: any;
  listComputerStatus: any;
  listComputerManufacturer: any;
  listComputerPage: any;
  searchPageInput: any;
  listComputerId = [];
  listComputerCode = [];
  computerId = '';
  location = '';
  startDateFrom = '';
  startDateTo = '';
  statusSearch = '';
  computerTypeSearch = '';
  p = 0;
  ps: Array<any> = [];
  check = 0;
  searchComputerForm: FormGroup;
  private roles: string[];
  isLogged = false;
  showAdminBoard = false;

  constructor(private tokenStorageService: TokenStorageService,
      private computerService: ComputerService,
              private dialog: MatDialog,
              private toastrService: ToastrService,
              private title: Title
  ) {
    this.title.setTitle('Computer List');
    this.searchComputerForm = new FormGroup({
      computerId: new FormControl('', [Validators.pattern('^CP[0-9]*$')]),
      startUsedDateFrom: new FormControl('', [Validators.required, this.checkDateFrom]),
      // @ts-ignore
      startUsedDateTo: new FormControl('', [Validators.required, this.checkDateTo]),
      location: new FormControl('', [Validators.pattern('^[A,B,C]{1}[0-9]*$')]),
      computerStatus: new FormControl('', [Validators.required]),
      computerType: new FormControl('', [Validators.required]),
    }, {validators: (this.checkDate)});
  }

  ngOnInit(): void {
      this.isLogged = !!this.tokenStorageService.getToken();

      if (this.isLogged) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
        if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')){
          this.showAdminBoard = true;
        }
    }
    this.computerService.getAllComputer().subscribe(value => this.listComputer = value);
    this.computerService.getAllComputerType().subscribe(value => this.listComputerType = value);
    this.computerService.getAllComputerStatus().subscribe(value => this.listComputerStatus = value);
    this.computerService.getAllComputerManufacturer().subscribe(value => this.listComputerManufacturer = value);
    this.getAll();
  }

  private getAll() {
    // tslint:disable-next-line:triple-equals
    if (this.check == 1) {
      this.computerService.searchComputer(this.computerId, this.location, this.computerTypeSearch, this.statusSearch,
        this.startDateFrom, this.startDateTo, this.p).subscribe(value => {
        // @ts-ignore
        this.listComputerPage = value.content;
        for (let i = 0; i < this.listComputerPage.length; i++) {
          for (let j = 0; j < this.listComputerId.length; j++) {
            if (this.listComputerPage[i].computerId === this.listComputerId[j]) {
              this.listComputerPage[i].flagDelete = 2;
            }
          }
        }
        // @ts-ignore
        this.ps = new Array<any>(value.totalPages);
      });
    } else {
      this.computerService.getAllComputerPage(this.p).subscribe(value => {
        this.listComputerPage = value.content;
        for (let i = 0; i < this.listComputerPage.length; i++) {
          for (let j = 0; j < this.listComputerId.length; j++) {
            if (this.listComputerPage[i].computerId === this.listComputerId[j]) {
              this.listComputerPage[i].flagDelete = 2;
            }
          }
        }
        this.ps = new Array<any>(value.totalPages);
      });
    }
  }

  nextPage() {
    this.p = this.p + 1;
    this.getAll();
  }

  previousPage() {
    this.p = this.p - 1;
    this.getAll();
  }

  lastPage() {
    this.p = this.ps.length - 1;
    this.getAll();
  }

  firstPage() {
    this.p = 0;
    this.getAll();
  }

  deleteComputer(computerId: number, computerCode: string) {
    const dialogRef = this.dialog.open(ComputerDeleteComponent, {
      width: '500px',
      height: '360px',
      data: {
        idComputer: computerId,
        nameComputer: computerCode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.ngOnInit();
      }
    });
  }

  searchPage() {
    if (this.searchPageInput == null) {
      this.getAll();
      return;
    }
    if (Number(this.searchPageInput) > this.ps.length) {
      this.toastrService.error('Error: page need to show > total page.');
      return;
    }
    if (Number(this.searchPageInput) < 1) {
      this.toastrService.error('Error: Input page > 0 please.');
      return;
    }
    this.p = Number(this.searchPageInput) - 1;
    this.getAll();
  }

  addComputerId(id: number, code: string) {
    for (let i = 0; i < this.listComputerId.length; i++) {
      if (this.listComputerId[i] === id) {
        this.listComputerId.splice(i, 1);
        this.listComputerCode.splice(i, 1);
        return;
      }
    }
    this.listComputerId.push(id);
    this.listComputerCode.push(code);
  }

  deleteComputers() {
    if (this.listComputerId.length === 0) {
      this.toastrService.error('Choose computer need to delete, please.');
      return;
    } else {
      const dialogRef = this.dialog.open(ComputerListDeleteComponent, {
        width: '500px',
        height: '360px',
        data: {
          idComputer: this.listComputerId,
          nameComputer: this.listComputerCode
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.listComputerId = [];
          this.listComputerCode = [];
          this.ngOnInit();
        }
      });
    }
  }

  searchComputer() {
    const dateFrom = new Date(this.startDateFrom);
    const mesDate = new Date();
    this.p = 0;
    if (dateFrom > new Date()) {
      this.toastrService.error('Input Start date from < ' + mesDate + ' please.');
      return;
    }
    const dateTo = new Date(this.startDateTo);
    if (dateTo > new Date()) {
      this.toastrService.error('Input Start date to < ' + mesDate + ' please.');
      return;
    }
    this.computerService.searchComputer(this.computerId.trim(), this.location.trim(), this.computerTypeSearch, this.statusSearch,
      this.startDateFrom, this.startDateTo, this.p).subscribe(value => {
      // @ts-ignore
      this.listComputerPage = value.content;
      // @ts-ignore
      this.ps = new Array<any>(value.totalPages);
      this.check = 1;
    }, error => {
      if (error.status === 404) {
        this.toastrService.error('Not found computer.');
      }
    });
  }

  private checkDate(check: AbstractControl): any {
    const fromDate = check.get('startUsedDateFrom');
    const toDate = check.get('startUsedDateTo');
    return fromDate.value <= toDate.value ? null : {errorDateTo: true};
  }

  private checkDateFrom(check: AbstractControl) {
    const fromDate = new Date(check.value);
    const nowDate = new Date();
    return fromDate < nowDate ? null : {errorDateFromNow: true};
  }

  private checkDateTo(check: AbstractControl) {
    const toDate = new Date(check.value);
    const nowDate = new Date();
    return toDate < nowDate ? null : {errorDateToNow: true};
  }

  resetForm() {
    this.searchComputerForm = new FormGroup({
      computerId: new FormControl('', [Validators.pattern('^CP[0-9]*$')]),
      startUsedDateFrom: new FormControl('', [Validators.required, this.checkDateFrom]),
      // @ts-ignore
      startUsedDateTo: new FormControl('', [Validators.required, this.checkDateTo]),
      location: new FormControl('', [Validators.pattern('^[A,B,C]{1}[0-9]{4}$')]),
      computerStatus: new FormControl('', [Validators.required]),
      computerType: new FormControl('', [Validators.required]),
    }, {validators: (this.checkDate)});
    this.check = 0;
    this.computerId = '';
    this.location = '';
    this.startDateFrom = '';
    this.startDateTo = '';
    this.statusSearch = '';
    this.computerTypeSearch = '';
    this.getAll();
  }
}
