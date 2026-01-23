import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Store } from '@ngrx/store';
import { login } from '../../auth-store/auth.actions';
import { authSelector, loadingSelector } from '../../auth-store/auth.selectors';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { AuthState } from '../../auth-store/auth.reducer';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private fb = inject(FormBuilder);
  private readonly store: Store<AuthState> = inject(Store);

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  isLoginMode = signal<boolean>(false);
  submitted = signal<boolean>(false);
  auth$ = this.store.selectSignal(loadingSelector);

  onSubmit() {
    this.submitted.set(true);
    console.log(this.isLoginMode());
    if (!this.isLoginMode()) {
      this.form.get('firstName')?.enable();
      this.form.get('lastName')?.enable();
      this.form.get('firstName')?.addValidators([Validators.required, Validators.minLength(3)]);
      this.form.get('lastName')?.addValidators([Validators.required, Validators.minLength(3)]);
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.submitted.set(false);
      }
    } else if (this.isLoginMode()) {
      this.form.get('firstName')?.disable();
      this.form.get('lastName')?.disable();
      this.form.updateValueAndValidity();
      if (this.form.valid) {
        this.submitted.set(false);
        this.store.dispatch(
          login({ email: this.form.value.email, password: this.form.value.password }),
        );
      }
    }
  }

  onClick() {
    this.isLoginMode.set(!this.isLoginMode());
    if (this.isLoginMode()) {
      this.form.get('firstName')?.disable();
      this.form.get('lastName')?.disable();
      this.form.updateValueAndValidity();
    } else {
      this.form.get('firstName')?.enable();
      this.form.get('lastName')?.enable();
      this.form.get('firstName')?.addValidators([Validators.required, Validators.minLength(3)]);
      this.form.get('lastName')?.addValidators([Validators.required, Validators.minLength(3)]);
      this.form.updateValueAndValidity();
    }
  }

  isInvalid(controlField: string) {
    const control = this.form.get(controlField);
    return control?.invalid && this.submitted();
  }
}
