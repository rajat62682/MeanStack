import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('f') signUpForm:NgForm;
  username='';
  password='';
  loginClicked=false;
  error=false;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.signUpForm);
     this.loginService.setLogin(this.signUpForm.value.username,this.signUpForm.value.password);
     this.loginClicked=true;
    this.router.navigate(['/home']).then((value)=>{
         this.loginClicked=false;
         if(value==false){
          this.error=true;
         }
    })
  }


}
