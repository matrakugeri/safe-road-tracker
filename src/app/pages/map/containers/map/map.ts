import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authChecked, stateSelector } from '../../../auth/auth-store/auth.selectors';
import { JsonPipe } from '@angular/common';
import { logout } from '../../../auth/auth-store/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.html',
  styleUrl: './map.scss',
})
export class Map {}
