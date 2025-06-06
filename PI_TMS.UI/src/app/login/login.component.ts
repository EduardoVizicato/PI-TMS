import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './services/login.service';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [HttpClientModule, FormsModule, CommonModule,],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(
    private loginService: LoginService,
    private routerService: Router
  ) { }

  SendLogin() {
    localStorage.setItem('authStatus', 'true');
    console.log('Login successful');
    this.routerService.navigate(['/dashboard']); // mudar de lugar 


    // this.loginService.registerLogin(this.email, this.password).subscribe(
    //     (response) => {
    //       localStorage.setItem('authStatus', 'true');
    //       console.log('Login successful');
    //       this.routerService.navigate(['/dashboard']); // mudar de lugar 
    //     },
    //     (error) => {
    //       window.alert('Login failed');
    //     }
    //   );
    
  }
}