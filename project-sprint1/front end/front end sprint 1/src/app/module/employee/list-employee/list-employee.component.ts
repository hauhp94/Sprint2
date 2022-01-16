import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Position} from '../../../model/employee/position';
import {CheckAgeValidator, DateBirthSearchValidator, DatePastValidator} from '../commons/validatorDate.validator';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Employee} from '../../../model/employee/employee';
import {Province} from '../../../model/address/province';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from "@angular/material/dialog";
import {DeleteEmployeeComponent} from "../delete-employee/delete-employee.component";
import {Title} from "@angular/platform-browser";
import {TokenStorageService} from "../../../service/account/token-storage.service";
import {GameService} from "../../../service/game/game.service";
import {GameTypeService} from "../../../service/game/gameType/game-type.service";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  searchForm: FormGroup;
  flagSearch: number;
  page: number;
  totalPage = 0;

  listPositon: any;
  listProvince: any;
  listEmployee: any;
  private roles: string[];
  isLogged = false;
  showAdminBoard = false;

  constructor(private tokenStorageService: TokenStorageService, private employeeService: EmployeeService,
              private matDialog: MatDialog,
              private toast: ToastrService,
              private titleService: Title) {
    this.titleService.setTitle('List Employee');
  }

  ngOnInit(): void {
      this.isLogged = !!this.tokenStorageService.getToken();

      if (this.isLogged) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    }
    this.searchForm = new FormGroup({
      employeeId: new FormControl('', [Validators.maxLength(10)]),
      dateOfBirthFrom: new FormControl('', [CheckAgeValidator]),
      dateOfBirthTo: new FormControl('', [CheckAgeValidator]),
      startWorkDateFrom: new FormControl('', [DatePastValidator]),
      startWorkDateTo: new FormControl('', [DatePastValidator]),
      positon: new FormControl(''),
      address: new FormControl(''),
    }, {validators: DateBirthSearchValidator});
    this.flagSearch = 0;
    this.page = 0;
    this.getData();
    this.getAllEmployee(this.page);
  }

  getData() {
    this.employeeService.getAllPosition().subscribe(value => {
      // @ts-ignore
      this.listPositon = value;
    });
    this.employeeService.getAllProvince().subscribe(value => {
      this.listProvince = value;
    });
  }

// get list employee
  getAllEmployee(page: number) {
    this.employeeService.getAllEmployee(page).subscribe(value => {
      this.listEmployee = value.content;
      this.totalPage = value.totalPages;
    }, error => {
      this.toast.error('No data found', 'message error');
    });
  }

  // khue create search employee
  searchEmpoyee(page: number) {

    if (this.searchForm.value.employeeId === '' && this.searchForm.value.dateOfBirthFrom === '' &&
      this.searchForm.value.dateOfBirthTo === '' && this.searchForm.value.startWorkDateFrom === '' && this.searchForm.value.startWorkDateTo
      === '' && this.searchForm.value.positon === '' && this.searchForm.value.address === '') {
      this.toast.info('Please enter if you want to search', 'massage search');
    } else {
      this.flagSearch = 1;
      this.searchForm.value.employeeId = this.searchForm.value.employeeId.trim();
      this.employeeService.searchEmployee(page, this.searchForm.value.employeeId, this.searchForm.value.dateOfBirthFrom,
        this.searchForm.value.dateOfBirthTo, this.searchForm.value.startWorkDateFrom, this.searchForm.value.startWorkDateTo,
        this.searchForm.value.positon, this.searchForm.value.address).subscribe(value => {
        this.totalPage = value.totalPages;
        this.listEmployee = value.content;
      }, error => {
        this.toast.error('not found employee', 'message search');
        this.flagSearch = 0;
      });
    }
  }

  // khue create method set page 0
  setPage() {
    if (this.flagSearch == 1) {
      this.page = 0;
    }
  }

  // reset
  reset() {
    this.searchForm = new FormGroup({
      employeeId: new FormControl('', [Validators.maxLength(10)]),
      dateOfBirthFrom: new FormControl('', [CheckAgeValidator]),
      dateOfBirthTo: new FormControl('', [CheckAgeValidator]),
      startWorkDateFrom: new FormControl('', [DatePastValidator]),
      startWorkDateTo: new FormControl('', [DatePastValidator]),
      positon: new FormControl(''),
      address: new FormControl(''),
    }, {validators: DateBirthSearchValidator});
    this.flagSearch = 0;
    this.page = 0;
    this.getAllEmployee(this.page);
  }

  // khue create method next paging
  nextPage() {
    if (this.page < this.totalPage - 1) {
      this.page++;
    }
    console.log(this.page);
    if (this.flagSearch == 0) {
      this.getAllEmployee(this.page);
    } else {
      this.searchEmpoyee(this.page);
    }
  }

  // khue create method previous paging
  previousPage() {
    if (this.page > 0) {
      this.page--;
    } else {
      this.page = 0;
    }
    console.log(this.page);
    if (this.flagSearch == 0) {
      this.getAllEmployee(this.page);
    } else {
      this.searchEmpoyee(this.page);
    }
  }

  // khue create method first paging
  firstPage() {
    this.page = 0;
    if (this.flagSearch == 0) {
      this.getAllEmployee(this.page);
    } else {
      this.searchEmpoyee(this.page);
    }
  }

  // khue create method last paging
  lastPage() {
    if (this.page == this.totalPage - 1) {
      this.toast.info('You are on the last page', 'message last page');
    } else {
      this.page = this.totalPage - 1;
      if (this.flagSearch == 0) {
        this.getAllEmployee(this.page);
      } else {
        this.searchEmpoyee(this.page);
      }
    }
  }

  // khue create method search paging
  toPage(page: number) {
    if (page < this.totalPage && page >= 0) {
      this.page = page;
      if (this.flagSearch == 0) {
        this.getAllEmployee(this.page);
      } else {
        this.searchEmpoyee(this.page);
      }
    } else {
      if (page != -1) {
        this.toast.warning('Request to enter the number of pages in the list', 'massage search page');
        if (this.flagSearch == 0) {
          this.getAllEmployee(this.page);
        } else {
          this.searchEmpoyee(this.page);
        }
      }
    }
  }

  // khuê create method delete employee
  openDialog(employee: Employee) {
    const dialogRef = this.matDialog.open(DeleteEmployeeComponent, {
      width: '500px',
      height: '360px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.employeeService.deleteEmployee(result.employeeId).subscribe(value => {
            this.reset();
            this.toast.success('delete ' + result.fullName + ' success', 'massage delete');
          },
          error => {
            this.toast.error('delete ' + result.fullName + ' failure', 'massage delete');
            this.reset();
          });
      }
    });
  }
}
