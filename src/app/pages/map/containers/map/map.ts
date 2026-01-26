import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { stateSelector } from '../../../auth/auth-store/auth.selectors';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-map',
  imports: [JsonPipe],
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {
  private store = inject(Store);
  auth = this.store.selectSignal(stateSelector);
}
