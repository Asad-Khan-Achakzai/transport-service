import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef, private control: NgControl) { console.log("derictive");}
  
  @HostListener('input', ['$event'])
  onEvent($event) {
    const event = this.el.nativeElement.value;
    // remove algl mask characters (keep only numeric)
    if (event) {
      let newVal = event.replace(/\D/g, '');
      // const rawValue = newVal;
      // don't show braces for empty value
      if (newVal.length == 0) {
        newVal = '';
      } else if (newVal.length <= 4) {
        newVal = newVal.replace(/^(\d{1,4})/, '$1');}
        else {
          newVal = newVal.replace(/^(\d{1,4})(.*)/, "$1-$2");}
      // set the new value
      this.control.control.setValue(newVal);
    }
  }


}
