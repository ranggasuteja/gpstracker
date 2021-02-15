import L from "leaflet";
import { DeviceHandler } from "./DeviceHandler";

export class MapMain {
  constructor() {
    // Baca html element map
    this.map = L.map(document.getElementById("map"));

    // Set titik tengah map awal
    this.map.setView([-6.8225976, 107.6234997], 13);

    // Set layer data peta OSM
    this.mapServer();

    // Inisialisasi click lat lon popup
    // this.latlonPopupEvent();

    this.deviceHandler = new DeviceHandler(this.map);
  }

  // Layer data map
  mapServer() {
    // Map data
    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data & copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  latlonPopupEvent() {
    const onMapClick = (e) => {
      const popup = L.popup();
      popup
        .setLatLng(e.latlng)
        .setContent("Koordinat:" + e.latlng.toString())
        .openOn(this.map);
    };

    this.map.on("click", onMapClick);
  }
}
// var points = [
//     {lat: -6.814148, lon:107.664889},
//     {lat: -6.832045, lon:107.682737},
//     {lat: -6.842612, lon:107.648242},
//     {lat: -6.855736, lon:107.644123},
//     {lat: -6.881641, lon:107.620097},
//     ];

// var marker = null;
// var line = L.polyline([]).addTo(map);

// function redraw(point) {
// if (!marker) {
//     marker = L.marker(point).addTo(map)
// }
// line.addLatLng(point);
// marker.setLatLng(point);
// }

// function update() {
// if (points.length) {
//     redraw(points.shift());
//     setTimeout(update, 1000);
// }
// }
// setTimeout(update, 1000);

// this end moving marker

// L.marker([-6.8225976, 107.6234997]).addTo(map)
// .bindPopup("<b>PERHATIAN!</b><br /><i>SESKOAU TNI</i>").openPopup();

// Menambah Polygon dan circle
// L.circle([-6.852634, 107.591748], 1000, {
// color: 'green',
// fillColor: 'yellow',//#f03
// fillOpacity: 0.5
// }).addTo(map).bindPopup("Titik Kumpul");

// L.polygon([
// [-6.833545, 107.683657],
// [-6.865076, 107.668711],
// [-6.867291, 107.720936]
// ]).addTo(map).bindPopup("Segitiga Samatangan");
