import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-store-content',
  templateUrl: './store-content.component.html',
  styleUrls: ['./store-content.component.css']
})
export class StoreContentComponent implements OnInit {

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  progress() {
    this.toast.success('Tính năng đang phát triển');
  }
}
