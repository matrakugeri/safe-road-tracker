import { Component, input, output } from '@angular/core';
import { LeafletDirective, LeafletModule } from '@bluehalo/ngx-leaflet';
import { circle, latLng, LeafletMouseEvent, tileLayer } from 'leaflet';
import { Maps } from './maps';

@Component({
  selector: 'app-leaflet-map',
  imports: [LeafletDirective, LeafletModule],
  templateUrl: './leaflet-map.html',
  styleUrl: './leaflet-map.scss',
})
export class LeafletMap {
  width = input<string>();
  mapClicked = output<LeafletMouseEvent>();

  options = {
    zoom: 15,
    center: latLng(41.3275, 19.8187),
  };
  layersControl = {
    baseLayers: {
      OpenStreetMap: tileLayer(Maps.mainMap, {
        maxZoom: 19,
      }),
      'Dark Mode': tileLayer(Maps.darkMap, {
        maxZoom: 19,
      }),
      Satellite: tileLayer(Maps.sateliteMap, { maxZoom: 19 }),
      'Light Map': tileLayer(Maps.lightMap, { maxZoom: 19 }),
    },
    overlays: {},
  };
  defaultLayer = [this.layersControl.baseLayers['OpenStreetMap']];
  onMapClick(event: LeafletMouseEvent) {
    console.log(event);
    this.mapClicked.emit(event);
  }
}
