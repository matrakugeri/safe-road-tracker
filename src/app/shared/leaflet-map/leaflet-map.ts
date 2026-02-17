import { Component } from '@angular/core';
import { LeafletDirective } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  imports: [LeafletDirective],
  templateUrl: './leaflet-map.html',
  styleUrl: './leaflet-map.scss',
})
export class LeafletMap {
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909),
  };
}
