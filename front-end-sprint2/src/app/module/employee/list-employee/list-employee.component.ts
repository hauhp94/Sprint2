import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../service/employee/employee.service';
import {DeleteEmployeeComponent} from '../delete-employee/delete-employee.component';
import {MatDialog} from '@angular/material/dialog';
import {ViewEmployeeComponent} from '../view-employee/view-employee.component';
import {Employee} from '../../../model/employee/employee';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  pageEmployee: Employee[];
  page = 0;
  totalPage = 0;
  listAddress: string[];
  searchForm: FormGroup;
  flagSearch = 0;
  searchPage: any;

  constructor(private employeeService: EmployeeService,
              public dialog: MatDialog,
              private toast: ToastrService,
              private titleService: Title) {
    titleService.setTitle('Danh sách nhân viên');
  }

  ngOnInit(): void {
    this.getAllListAddress();
    this.getSearchForm();
    this.flagSearch = 0;
    this.getAllEmployee(this.page);
  }

  getAllEmployee(page: number) {
    this.employeeService.findAll(page).subscribe(value => {
      this.pageEmployee = value.content;
      this.totalPage = value.totalPages;
    });
  }

  getAllListAddress() {
    this.employeeService.findAllListAddress().subscribe(value => {
      this.listAddress = value;
    });
  }

  getSearchForm() {
    this.searchForm = new FormGroup({
      name: new FormControl('', Validators.maxLength(50)),
      phone: new FormControl('', Validators.maxLength(50)),
      address: new FormControl('', Validators.maxLength(50))
    });
  }


  openDialogView(id: number) {
    this.employeeService.findById(id).subscribe(data => {
      const dialogRef = this.dialog.open(ViewEmployeeComponent, {
        data: {employee: data},
        width: '700px',
        height: 'auto',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  openDialogDelete(id: number) {
    this.employeeService.findById(id).subscribe(data => {
      const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
        data: {employee: data},
        width: '700px',
        height: 'auto',
        disableClose: true,
      });
      dialogRef.afterClosed().subscribe(() => {
        this.ngOnInit();
      });
    });
  }

  previous() {
    if (this.page > 0) {
      this.page = this.page - 1;
    }
    if (this.flagSearch == 1) {
      this.search();
    } else {
      this.getAllEmployee(this.page);
    }
  }

  next() {
    if (this.page < this.totalPage - 1) {
      this.page = this.page + 1;
    }
    if (this.flagSearch == 1) {
      this.search();
    } else {
      this.getAllEmployee(this.page);
    }
  }

  setPage() {
    if (this.flagSearch == 1) {
      this.page = 0;
    }
  }

  search() {
    this.flagSearch = 1;
    this.employeeService.searchEmployee(this.page, this.searchForm.value.name, this.searchForm.value.phone,
      this.searchForm.value.address).subscribe(value => {
      if (value != null) {
        this.pageEmployee = value.content;
        this.totalPage = value.totalPages;
      } else {
        this.page = 0;
        this.flagSearch = 0;
        this.toast.error('Không tìm thấy nhân viên');
        this.getAllEmployee(this.page);
      }
    });
  }

  goPage(value: string) {
    let p = Number(value) - 1;
    if (p < this.totalPage && p >= 0) {
      this.page = p;
      if (this.flagSearch === 0) {
        this.getAllEmployee(this.page);
      } else {
        this.search();
      }
    } else {
      if (value === '') {
        this.toast.warning('Vui lòng nhập số trang', 'Thông báo');
      } else {
        this.toast.warning('Vui lòng nhập đúng số trang', 'Thông báo');
      }
    }
  }
}
