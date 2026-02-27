import { Component } from '@angular/core';
import { LeafletMap } from '../../../../shared/leaflet-map/leaflet-map';
import { LeafletMouseEvent } from 'leaflet';

@Component({
  selector: 'app-report',
  imports: [LeafletMap],
  templateUrl: './report.html',
  styleUrl: './report.scss',
})
export class Report {
  onMapClick(event: LeafletMouseEvent) {
    console.log(event);
  }
}
