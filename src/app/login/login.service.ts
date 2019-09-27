import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 

username="admin";
password="admin";
loggedIn=false;

  constructor(private http:HttpClient) { }

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
        }, 200);
      }
    );
    return promise;
  }


  checkLogin(user){
    return this.http.post("/api/login",user);
  }
  logout(){

    this.loggedIn=false;
    this.http.get("/api/logout");
  }


}
