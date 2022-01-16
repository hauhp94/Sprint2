import {Component, Inject, OnInit} from '@angular/core';
import {Employee} from '../../../model/employee/employee';
import {EmployeeService} from '../../../service/employee/employee.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employee: Employee;
  constructor(private employeeService: EmployeeService,
              public dialogRef: MatDialogRef<ViewEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
           ) { }

  ngOnInit(): void {
    this.employee = this.data.employee;
  }
  close(): void {
    this.dialogRef.close();
  }

}
