import {Component, Inject, OnInit} from '@angular/core';
import {ComputerService} from "../../../service/computer/computer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-computer-list-delete',
  templateUrl: './computer-list-delete.component.html',
  styleUrls: ['./computer-list-delete.component.css']
})
export class ComputerListDeleteComponent implements OnInit {

  constructor(private computerService: ComputerService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              public dialog: MatDialogRef<ComputerListDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
  }

  delete() {
    for (let i = 0; i <= this.data.idComputer.length; i++) {
      this.computerService.delete(this.data.idComputer[i]).subscribe(() => {
          this.dialog.close(true);
          /*this.router.navigateByUrl('');*/
          this.toastrService.info('Delete computer ' + this.data.nameComputer[i] + ' Success.');
        }
        , error => {
          if (error.status === 406) {
            this.toastrService.error('Delete fail: Computer ' + this.data.nameComputer[i] + ' is online.');
            this.dialog.close(true);
          }
          if (error.status === 404) {
            this.toastrService.error('Delete fail: Computer ' + this.data.nameComputer[i] + ' not found.');
            this.dialog.close(true);
          }
        });
    }
  }

}
