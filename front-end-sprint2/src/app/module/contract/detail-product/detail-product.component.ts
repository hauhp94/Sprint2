import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public  dialogRef: MatDialogRef<DetailProductComponent>) { }

  ngOnInit(): void {
  }

}
