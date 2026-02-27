import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from '../../../../pages/auth/auth-store/auth.actions';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private store = inject(Store);
  onLogout() {
    this.store.dispatch(logout());
  }
}
