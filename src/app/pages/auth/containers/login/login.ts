import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loadingSelector, stateSelector } from '../../auth-store/auth.selectors';
import { clearError, login, register } from '../../auth-store/auth.actions';
import { AuthState } from '../../auth-store/auth.reducer';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, LoadingSpinner],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private readonly store: Store<AuthState> = inject(Store);
  private router = inject(Router);
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [''],
  });
  isLoginMode = signal<boolean>(false);
  submitted = signal<boolean>(false);
  auth = this.store.selectSignal(stateSelector);
  loading = this.store.selectSignal(loadingSelector);

  onSubmit() {
    this.submitted.set(true);
    console.log(this.form.valid);
    if (this.form.valid) {
      this.submitted.set(false);
      this.store.dispatch(
        login({ email: this.form.value.email, password: this.form.value.password }),
      );
    }
  }

  onClick() {
    this.router.navigate(['signup']);
    this.store.dispatch(clearError());
  }

  isNotEmpty(): boolean {
    return Object.values(this.form.value).every((value) => value);
  }

  isInvalid(controlField: string) {
    const control = this.form.get(controlField);
    return control?.invalid && this.submitted();
  }
}
