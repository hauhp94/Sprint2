import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employee} from "../../../model/employee/employee";

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee,
              public dialogRef: MatDialogRef<DeleteEmployeeComponent>) {
  }

  ngOnInit(): void {
  }

  closeForm() {
    this.dialogRef.close();
  }

  deleteEmployee(employee: Employee) {
    this.dialogRef.close(employee);
  }
}
