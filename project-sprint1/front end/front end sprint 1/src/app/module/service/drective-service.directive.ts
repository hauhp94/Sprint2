import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appDrectiveService]'
})
export class DrectiveServiceDirective {

  constructor(private  el: ElementRef) { }

  @HostListener('ngSubmit')
  OnFormSunmit(){
    const invalidControl = this.el.nativeElement.querySelector('.ng-invalid');
    if (invalidControl){
      invalidControl.focus();
    }
  }

}
