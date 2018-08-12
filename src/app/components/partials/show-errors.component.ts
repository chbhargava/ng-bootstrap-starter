// show-errors.component.ts
import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'show-errors',
  template: `
   <ul *ngIf="shouldShowErrors()" style="list-style:none;padding:0;">
     <li style="color: red" *ngFor="let error of listOfErrors()">{{error}}</li>
   </ul>
 `,
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'Entry required',
    'minlength': (params) => 'Minimum characters are ' + params.requiredLength,
    'maxlength': (params) => 'Maximum characters are ' + params.requiredLength,
    'pattern': (params) => 'Invalid entry', // 'The required pattern is: ' + params.requiredPattern,
    'years': (params) => params.message,
    'countryCity': (params) => params.message,
    'uniqueName': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message
  };

  @Input() private f: NgForm;
  @Input() private control: NgModel;
  @Input() private sameValue: NgModel;
  @Input() private notSameValue: NgModel;
  @Input() private other: NgModel;
  @Input() private invalidVal: string;
  @Input() private alreadyTaken:boolean

  shouldShowErrors(): boolean {
    let ret = this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched || this.f.submitted) ||
      (this.control.touched && this.sameValue != undefined && this.sameValue.value != this.control.value) ||
      (this.control.touched && this.notSameValue != undefined && this.notSameValue.value == this.control.value) ||
      (this.invalidVal != undefined && this.control.value == this.invalidVal)||this.alreadyTaken;

    if (this.other != undefined) {
      // ret - true means, there is an error, now check other field
      ret = ret && (this.other.value == undefined || this.other.value == '');
    }
    return ret;
  }

  listOfErrors(): string[] {
    if (this.other != undefined && (this.other.value == undefined || this.other.value == '')) {
      // return ["Either " + this.other.name + " or " + this.control.name + " is required"];
      return ["Entry Required"];
    }
    if (this.invalidVal != undefined && this.control.value == this.invalidVal) {
      return ["Invalid value"];
    }

    if (this.sameValue != undefined) {
      if (this.sameValue.valid && this.sameValue.value != this.control.value) {
        let name = this.sameValue.name;
        if(name == "newpassword") {
          name = "New Password";
        }
        return [ name + " must match" ];
      }
    }
    if (this.notSameValue != undefined) {
      if (this.notSameValue.valid && this.notSameValue.value == this.control.value) {
        return ["must not be same as " + this.notSameValue.name];
      }
    }
   
    if(this.alreadyTaken){
      return [this.control.name +" already in use"];
    }

    if(this.control.errors != undefined && this.control.errors != null) {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
    }
    return [];
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}