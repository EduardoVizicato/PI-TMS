import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginService } from './services/login.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [HttpClientModule,FormsModule, CommonModule,],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  constructor(private loginService: LoginService) {}
  SendLogin() {
    this.loginService.registerLogin(this.email, this.password).subscribe(
      (response) => {
        console.log('Login successful');
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
