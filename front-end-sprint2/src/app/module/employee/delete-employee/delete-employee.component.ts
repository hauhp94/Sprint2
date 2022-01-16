import {Component, Inject, OnInit} from '@angular/core';
import {EmployeeService} from '../../../service/employee/employee.service';
import {Employee} from '../../../model/employee/employee';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
  employee: Employee;
  constructor(private employeeService: EmployeeService,
              public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast: ToastrService,) { }

  ngOnInit(): void {
    this.employee = this.data.employee;
  }
  close(): void {
    this.dialogRef.close();
  }
  confirm(): void {
    this.employeeService.deleteEmployee(this.employee.employeeId,this.employee).subscribe(() => {
      this.toast.success("Xóa thành công nhân viên "+ this.employee.name)
      this.dialogRef.close();

    })

  }

}
