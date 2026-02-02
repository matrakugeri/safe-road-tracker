import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadCurrentUser, setUser } from './pages/auth/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { authChecked, userSelector } from './pages/auth/auth-store/auth.selectors';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('safe-road-tracker');
  store = inject(Store);

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.store.dispatch(setUser({ user: parsedUser }));
    }
  }
}
