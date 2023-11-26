import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { GmapService } from '../services/gmap/gmap.service';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-test', 
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit, OnDestroy {

  @ViewChild('map', { static: true }) mapElementRef: ElementRef;
  googleMaps: any;
  source: any = { lat: -33.03362966535819, lng: -71.53318297607662 };
  dest: any = { lat: -33.02555667010105, lng: -71.55216334412006 };
  map: any;
  directionsService: any;
  directionsDisplay: any;
  source_marker: any;
  destination_marker: any;
  trackSub: Subscription;

  constructor(
    private maps: GmapService,
    private renderer: Renderer2,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
   this.loadMap();
  }

  async loadMap() {
    try {
      const sourceAddress = 'origen'; // Reemplaza con la dirección de origen
      const destAddress = 'destino'; // Reemplaza con la dirección de destino
      
      const sourceCoords = await this.getCoordinates(sourceAddress);
      const destCoords = await this.getCoordinates(destAddress);

      this.source = { lat: sourceCoords.results[0].geometry.location.lat, lng: sourceCoords.results[0].geometry.location.lng };
      this.dest = { lat: destCoords.results[0].geometry.location.lat, lng: destCoords.results[0].geometry.location.lng };


      console.log('map');
      let googleMaps: any = await this.maps.loadGoogleMaps();
      const mapEl = this.mapElementRef.nativeElement;
      this.map = new googleMaps.Map(mapEl, {
        center: { lat: this.source.lat, lng: this.source.lng },
        disableDefaultUI: true,
        zoom: 13,
      });
      this.directionsService = new googleMaps.DirectionsService;
      this.directionsDisplay = new googleMaps.DirectionsRenderer;
      this.directionsDisplay = new googleMaps.DirectionsRenderer();

      // const sourceIconUrl = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';
      // const destinationIconUrl = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
      const sourceIconUrl = 'assets/car.png';
      const destinationIconUrl = 'assets/pin.png';

      const source_position = new googleMaps.LatLng(this.source.lat, this.source.lng);
      const destination_position = new googleMaps.LatLng(this.dest.lat, this.dest.lng);

      const source_icon = {
        url: sourceIconUrl,
        scaledSize: new googleMaps.Size(50, 50), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(0, 0) // anchor
      };
      const destination_icon = {
        url: destinationIconUrl,
        scaledSize: new googleMaps.Size(50, 50), // scaled size
        origin: new googleMaps.Point(0, 0), // origin
        anchor: new googleMaps.Point(0, 0) // anchor
      };
      this.source_marker = new googleMaps.Marker({
        map: this.map,
        position: source_position,
        animation: googleMaps.Animation.DROP,
        icon: source_icon,
      });

      this.destination_marker = new googleMaps.Marker({
        map: this.map,
        position: destination_position,
        animation: googleMaps.Animation.DROP,
        icon: destination_icon
      });

      this.source_marker.setMap(this.map);
      this.destination_marker.setMap(this.map);

      this.directionsDisplay.setMap(this.map);
      this.directionsDisplay.setOptions({
        polylineOptions: {
          strokeWeight: 4,
          strokeOpacity: 1,
          strokeColor: 'black'
        },
        suppressMarkers: true
      });

      await this.drawRoute();

      this.map.setCenter(source_position);
      this.renderer.addClass(mapEl, 'visible');
    } catch (e) {
      console.log(e);
    }
  }
  

  drawRoute() {
    this.directionsService.route({
      origin: this.source,
      destination: this.dest,
      travelMode: 'DRIVING',
      provideRouteAlternatives: true
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        console.log('response: ', response);
        const directionsData = response.routes[0].legs[0];
        console.log(directionsData);
        const duration = directionsData.duration.text;
        console.log(duration);
      } else {
        console.log(status);
      }
    });
  }

  changeMarkerPosition(data) {
    const newPosition = { lat: data?.lat, lng: data?.lng }; // Set the new marker position coordinates
    this.source_marker.setPosition(newPosition);
    // this.map.panTo(newPosition); // Pan the map to the new marker position
    this.drawRoute();
  }

  ngOnDestroy(): void {
    if (this.trackSub) this.trackSub.unsubscribe();
  }
  async getCoordinates(address: string): Promise<any> {
    try {
      const response = await this.maps.getCoordinates(address);
      return response;
    } catch (error) {
      throw new Error('Error al obtener las coordenadas');
    }


}
}
