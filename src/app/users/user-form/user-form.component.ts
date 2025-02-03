import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {

  title = 'reactive-form';
  form!: FormGroup;
 
  constructor(private usersService: UsersService, private fb: FormBuilder) {}
  
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[A-Za-z\\s]+$')]],
      username: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      website: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: this.createFormGroup('address'),
      geo: this.createFormGroup('geo'),
      company: this.createFormGroup('company')
    });
  }

  createFormGroup(type: 'address' | 'geo' | 'company'): FormGroup {
    const baseValidators = [Validators.required];
    switch (type) {
      case 'address':
        return this.fb.group({
          suite: ['', ...baseValidators],
          street: ['', ...baseValidators],
          city: ['', [...baseValidators, Validators.pattern('^[A-Za-z\\s]+$')]],
          zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]]
        });
      case 'geo':
        return this.fb.group({
          lat: ['', [...baseValidators, Validators.pattern('^[0-9.-]+$')]],
          lng: ['', [...baseValidators, Validators.pattern('^[0-9.-]+$')]]
        });
      case 'company':
        return this.fb.group({
          bs: ['', ...baseValidators],
          catchPhrase: ['', ...baseValidators],
          companyname: ['', ...baseValidators]
        });
      default:
        return this.fb.group({});
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.log("Form is invalid");
      console.log(this.form.errors);
      return;
    }

    console.log("Form Submitted Successfully!");
    // console.log(this.form.value); 
     this.usersService.addUser(this.form.value.email, this.form.value.name, this.form.value.username, this.form.value.phone, this.form.value.website, this.form.value.address.suite,this.form.value.address.street, this.form.value.address.city, this.form.value.address.zipcode, this.form.value.geo.lat, this.form.value.geo.lng, this.form.value.company.bs, this.form.value.company.catchPhrase, this.form.value.company.companyname).subscribe({
      
     })

    this.onReset()
  }

  onReset(){
    console.log( )
    this.form.reset();
  }

}
  // isEmailRemoveEnabled(index: number) {
  //   return this.emails.at(index).get('email')?.valid;
  // }

//   isAddressRemoveEnabled(index: number) {
//     return this.address.at(index).valid;
//   }

//   isSkillRemoveEnabled(index: number) {
//     return this.skills.at(index).valid;
//   }

//   // isEmailFormInvalid(i: number): boolean {
//   //   const emailForm = this.emails.at(i);
//   //   return !emailForm.valid || !emailForm.get('email')?.value;
//   // }

//   isAddressFormInvalid(i: number): boolean {
//     const addressForm = this.address.at(i);
//     return !addressForm.valid || !addressForm.get('street')?.value || !addressForm.get('city')?.value;
//   }

//   isSkillFormInvalid(): boolean {
//     return this.skills.at(0).get('skill')?.value === '' || !this.skills.at(0).valid;
//   }
// }
