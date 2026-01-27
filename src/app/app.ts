import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loadCurrentUser } from './pages/auth/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { userSelector } from './pages/auth/auth-store/auth.selectors';
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
    // this.store.dispatch(loadCurrentUser());
    const user = this.store.select(userSelector);
    user.pipe(
      map((user) => {
        if (user) {
          this.store.dispatch(loadCurrentUser());
        }
      }),
      tap({
        next: (data) => console.log(data),
        error: (err) => console.log(err),
      }),
    );
  }
}
