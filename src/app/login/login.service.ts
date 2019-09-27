import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 

username="admin";
password="admin";
loggedIn=false;

  constructor() { }

  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          //resolve(this.loggedIn);
          if(localStorage.getItem("user")){
            resolve(true)
          }
          else {
            resolve(false);
          }
        }, 2200);
      }
    );
    return promise;
  }


  setLogin(username,password){
    if(username===this.username && password===this.password){
     this.loggedIn=true;
     localStorage.setItem("user","admin")
    }
    else {
      this.loggedIn=false;
    }
  }
  logout(){
    this.loggedIn=false;
  }


}
