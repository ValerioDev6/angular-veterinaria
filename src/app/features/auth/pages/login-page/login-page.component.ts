import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule],
  templateUrl: './login-page.component.html',
  styles: ``,
})
export default class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private message = inject(NzMessageService);

  isLoading = signal<boolean>(false);
  passwordVisible = signal<boolean>(false);

  loginForm: FormGroup = this.fb.group({
    email: ['superadmin@gmail.com', [Validators.required, Validators.email]],
    password: ['superadmin123', [Validators.required, Validators.minLength(6)]],
  });

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }

    this.isLoading.set(true);
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (success) => {
        this.isLoading.set(false);
        if (success) {
          this.message.success('Inicio de sesión exitoso');
          this.router.navigate(['/admin/home']);
        } else {
          this.message.error('Credenciales inválidas');
        }
      },
      error: (error) => {
        this.isLoading.set(false);
        this.message.error('Error al iniciar sesión. Intenta nuevamente.');
        console.error('Login error:', error);
      },
    });
  }
  markFieldAsTouched(fieldName: string): void {
    const field = this.loginForm.get(fieldName);
    if (field) {
      field.markAsTouched();
      field.updateValueAndValidity();
    }
  }
  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible) => !visible);
  }
}
