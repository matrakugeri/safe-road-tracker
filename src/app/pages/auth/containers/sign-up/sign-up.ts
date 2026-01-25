import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth-store/auth.reducer';
import { loadingSelector, stateSelector } from '../../auth-store/auth.selectors';
import { register } from '../../auth-store/auth.actions';
import { Router } from '@angular/router';
import { LoadingSpinner } from '../../../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, LoadingSpinner],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  private fb = inject(FormBuilder);
  private readonly store: Store<AuthState> = inject(Store);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submitted = signal<boolean>(false);
  auth = this.store.selectSignal(stateSelector);
  loading = this.store.selectSignal(loadingSelector);

  onSubmit() {
    this.submitted.set(true);
    if (this.form.valid) {
      this.submitted.set(false);
      this.store.dispatch(register(this.form.value));
    }
  }

  onClick() {
    this.router.navigate(['login']);
  }

  isInvalid(controlField: string) {
    const control = this.form.get(controlField);
    return control?.invalid && this.submitted();
  }
}
