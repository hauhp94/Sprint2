import {Component, OnInit} from '@angular/core';
import {ComputerService} from "../../../service/computer/computer.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-computer',
  templateUrl: './create-computer.component.html',
  styleUrls: ['./create-computer.component.css']
})
export class CreateComputerComponent implements OnInit {
  formComputer: FormGroup;


  constructor(private computerService: ComputerService,
              private router: Router,
              private title: Title) {
    this.title.setTitle('Computer Create');
  }

  ngOnInit(): void {
    this.formComputer = new FormGroup({
      computerCode: new FormControl('',
        [Validators.required, Validators.pattern('^CP[0-9]{4}$')]),
      location: new FormControl('', [Validators.required,
        Validators.pattern('^(A[0-9]{4}|B[0-9]{4}|C[0-9]{4}|D[0-9]{4})$')]),
      startUsedDate: new FormControl('', [Validators.required, validateStartUsedDate]),
      configuration: new FormControl('', [Validators.required, Validators.maxLength(35)]),
      warrantyPeriod: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      flagDelete: new FormControl(0),
      computerType: new FormGroup({
        name: new FormControl('Loại 1', [Validators.required])
      }),
      computerManufacturer: new FormGroup({
        name: new FormControl('Dell', [Validators.required])
      }),
      computerStatus: new FormGroup({
        name: new FormControl('Đang chờ khách', [Validators.required])
      })
    })
  }

  create() {
    Swal.fire({
      title: 'Are you sure to create information entered ?',
      text: 'The task cannot be undone !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#de992a',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false
    }).then(value => {
      if (value.value) {
        this.computerService.createComputerDTO(this.formComputer.value).subscribe(value => {
          this.ngOnInit();
          this.router.navigateByUrl('create-computer')
            .then(value1 => this.computerService.showMessageSuccess("New added success!"))
        }, error => {
          this.router.navigateByUrl('create-computer')
            .then(value1 => this.computerService.showMessageErrors("Not success! Please enter again!"))
        })
      }
    })
  };

  public cleanForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => formGroup.get(key).setValue(formGroup.get(key).value.trim()));
  }

  reset() {
    Swal.fire({
      title: 'Are you sure to reset?',
      text: 'This action cannot be undone !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then(value => {
      if (value.value) {
        this.ngOnInit();
      }
    })
  }

  back() {
    Swal.fire({
      title: 'Are you sure back to home?',
      text: 'Changes will not be saved !',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      allowOutsideClick: false,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#768394'
    }).then(value => {
      if (value.value) {
        this.router.navigateByUrl('/computer-list');
      }
    })
  }


}

function validateStartUsedDate(fc: FormControl): any {
  console.log(fc.value.substr(8, 10));
  console.log(new Date(Date.now()).getDate())
  return Number(fc.value.substr(8, 10)) > new Date(Date.now()).getDate()
    ? {dateStart: true} : null;
}
