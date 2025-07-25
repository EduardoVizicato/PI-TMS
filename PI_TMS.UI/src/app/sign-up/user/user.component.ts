import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';
import { user } from './model/user.model';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  userForm: FormGroup;
  user: user[] = [];
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.userForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{6,}$/)]], // Senha deve ter pelo menos 6 caracteres, uma letra maiúscula e um número]],
      taxId: this.fb.group({
        taxId: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
      }),
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
    });
  }
// 

  onSubmit() {
    if (this.userForm.invalid) {
      console.log('Formulário inválido');
      this.userForm.markAllAsTouched(); // mostra erros
      return;
    }

    console.log('Formulário válido:', this.userForm.value);

    const userData: user = this.userForm.value;
    this.userService.registerUser(userData).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
      }
    });
  }

}
