import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }

  logOff() {
    localStorage.removeItem('authStatus');
    
  }
  
  getLoginStatus(){
    !!localStorage.getItem('loginStatus');
  }
  
}


