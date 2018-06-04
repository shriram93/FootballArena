import { Component, OnInit } from '@angular/core';
import { GyanmatrixService } from '../services/gyanmatrix.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent implements OnInit {

  submitMessage: string;


  constructor(private gyanmatrixService:GyanmatrixService, private dataService:DataService,private router:Router) { 
    this.submitMessage = "empty";
  }

  ngOnInit() {
  }

  registerUser(formFields) {
    // If any field is empty display error message
    if (formFields.value.email == undefined || formFields.value.email == '' || formFields.value.password == undefined || formFields.value.password == '') {
      this.submitMessage = 'Invalid Login Id or password';
      return;
    }
    else
    {
      this.submitMessage = "empty";
      this.gyanmatrixService.signUp({email:formFields.value.email,password:formFields.value.password}).subscribe(
        res => {
          console.log(res);
          if(res.message == "success")
          {
            this.submitMessage = "Account created. Login to continue";
            formFields.resetForm();
          }
          else{
            this.submitMessage = "Internal server error";
          }
        }
        ,
        err => {
          if(err.error == "email already exist")
          {
            this.submitMessage = "Login Id already exist";
          }
          else if(err.error == "Internal Server Error") {
            this.submitMessage = "Invalid Login Id or password";
          }
          else{
            this.submitMessage = "Internal server error";
          }
        }
      );
    }
  }

  signIn(formFields) {
    // If any field is empty display error message
    if (formFields.value.email == undefined || formFields.value.email == '' || formFields.value.password == undefined || formFields.value.password == '') {
      this.submitMessage = 'Invalid Login Id or password';
      return;
    }
    else
    {
      this.gyanmatrixService.login({email:formFields.value.email,password:formFields.value.password}).subscribe(
        res => {
          if(res.token)
          {
            this.dataService.changeBearerToken(res.token);
            this.router.navigate(['/home']);
          }
          else{
            this.submitMessage = "Internal server error";
          }
        }
        ,
        err => {
          if(err.error == "User not found")
          {
            this.submitMessage = "The Login Id you entered did not match our records";
          }
          else if(err.error == "Wrong password") {
            this.submitMessage = "The password you entered did not match our records";
          }
          else{
            this.submitMessage = "Internal server error";
          }
        }
      );
    }
  }
}
