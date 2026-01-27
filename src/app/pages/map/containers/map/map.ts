import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { stateSelector } from '../../../auth/auth-store/auth.selectors';
import { JsonPipe } from '@angular/common';
import { logout } from '../../../auth/auth-store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  imports: [JsonPipe],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {
  private store = inject(Store);
  auth = this.store.selectSignal(stateSelector);
  router = inject(Router);

  onLogout() {
    this.router.navigate(['/login']);
    this.store.dispatch(logout());
  }
}
