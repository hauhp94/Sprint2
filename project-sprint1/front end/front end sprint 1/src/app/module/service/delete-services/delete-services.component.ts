import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ServiceService} from '../../../service/service/service.service';
import {Services} from "../../../model/service/services";

class ServicesDeleteComponent {
}

@Component({
  selector: 'app-delete-services',
  templateUrl: './delete-services.component.html',
  styleUrls: ['./delete-services.component.css']
})
export class DeleteServicesComponent implements OnInit {

  services : Services ;
  public code: string;
  public listCode: Array<String> = [];
  public id: number;
  public listId: Array<number> = [];
public check=false;
  constructor(public dialogRef: MatDialogRef<ServicesDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toast: ToastrService,
              private serviceService: ServiceService) {
  }

  ngOnInit(): void {
    if (this.data.id==null){
      this.id=this.data.name.servicesId;
      this.code=this.data.name.code;
      this.check=false;
      console.log("id "+this.id);
    }else {
      this.listCode=this.data.code;
      this.listId=this.data.id;
      this.check=true;
      console.log(this.listId);
    }

    console.log("code "+this.listCode);
    console.log("id "+this.listId);

  }


  onNoClick(): void {
    this.listCode=[];
    this.listId=[];
    this.dialogRef.close(false);

  }

  // phap
  delete() {
      this.serviceService.deleteServices(this.id).subscribe(dataDialog => {
        this.dialogRef.close();
        this.toast.success('delete success fully');
      },error => {
        this.toast.error('Services not found !!!')
      });
  }
  // phap
  deleteServicesArr() {
    for (let i = 0; i < this.listId.length; i++) {
      this.serviceService.deleteServices(this.listId[i]).subscribe(dataDialog => {
        this.dialogRef.close(true);
      },error => {
          this.serviceService.findById(this.listId[i]).subscribe(value => {
            // @ts-ignore
            this.services = value;
            this.toast.error('Services not found ' + this.services.code);
         })
      });
    }
    this.toast.success('delete success fully');
  }
}
