import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private service:ApiserviceService, private router:ActivatedRoute) {}

  errormsg:any;
  successmsg:any;
  getparamid:any;

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    console.log("this.getparamid:", this.getparamid);
  
    this.service.getSingleData(this.getparamid).subscribe((res) => {
      console.log(res, 'res==>');
      this.userForm.patchValue({
        username: res.data[0].username,
        password: res.data[0].password,
        password2: res.data[0].password
      });
    });
  }

  userForm = new FormGroup({
    'username': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'password2': new FormControl('', [Validators.required, this.passwordMatchValidator.bind(this)])
  });
  
  // Create user
  userSubmit() {

    console.log("wtfff");
    const username = this.userForm.value.username;
    const password = this.userForm.value.password;
    const password2 = this.userForm.value.password2;
  
    if (this.userForm.valid) {
      if (password !== password2) {
        this.errormsg = 'Les mots de passe ne correspondent pas!';
      } else {
        this.service.createData(this.userForm.value).subscribe((res) => {
          console.log(res, 'res==>');
          this.userForm.reset();
          this.successmsg = res.message;
        });
      }
    } else {
      this.errormsg = 'Tous les champs doivent être complétés!';
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const password2 = control.get('password2')?.value;
  
    return password === password2 ? null : { passwordMismatch: true };
  }

  // Update user
  userUpdate() {

    console.log("user Update called");
    
    if(this.userForm.valid) {

      console.log("snif")

      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res)=>{
          this.successmsg = res.message;
          console.log("user Update Done");
      });

    } else {

      this.errormsg = "Tous les champs sont requis!"
       
    }

  }


}
