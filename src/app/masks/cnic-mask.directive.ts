import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  selector: '[appCnicMask]'
})
export class CnicMaskDirective {

  constructor(private el: ElementRef, private control: NgControl) {}
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
        newVal = newVal.replace(/^(\d{1,5})/, '$1');
      } else if (newVal.length <= 5) {
        newVal = newVal.replace(/^(\d{1,5})/, '$1-');
      } else if (newVal.length <= 11) {
        newVal = newVal.replace(/^(\d{1,5})(\d{1,7})/, '$1-$2');
      } else {
        newVal = newVal.replace(/^(\d{1,5})(\d{1,7})(.*)/, '$1-$2-$3');
      }
      // set the new value
      this.control.control.setValue(newVal);
    }
  }

}
