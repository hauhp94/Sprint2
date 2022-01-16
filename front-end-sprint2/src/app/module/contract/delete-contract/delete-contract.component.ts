import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Contract} from '../../../model/contract/contract';

@Component({
  selector: 'app-delete-contract',
  templateUrl: './delete-contract.component.html',
  styleUrls: ['./delete-contract.component.css']
})
export class DeleteContractComponent implements OnInit {

  constructor( public  dialogRef: MatDialogRef<DeleteContractComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
