import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  isLoginMode = signal<boolean>(false);
  submitted = signal<boolean>(false);

  onSubmit() {
    this.submitted.set(true);
    if (!this.isLoginMode() && this.form.valid) {
      this.submitted.set(false);
      this.authService.register(this.form.value).subscribe();
    } else if (this.isLoginMode() && this.form.valid) {
      this.submitted.set(false);
      this.authService.login(this.form.value.email, this.form.value.password).subscribe({
        next: (data) => console.log(data),
        error: (err) => console.error(err),
      });
    }
  }

  isInvalid(controlField: string) {
    const control = this.form.get(controlField);
    return control?.invalid && this.submitted();
  }
}
