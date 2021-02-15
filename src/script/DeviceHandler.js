import L from "leaflet";
import { DeviceModel, DeviceDataModel } from "./model/DeviceModel";

/** Class for device handling */
export class DeviceHandler {
  /**
   * @constructor
   * @param {*} map - Instance map leaflet
   */
  constructor(map) {
    // Baca html element map
    this.map = map;

    // Collection of device
    this.devices = [];
    this.addDevice(
      DeviceDataModel({ latitude: -6.814148, longitude: 107.664889 })
    );

    this.removeDevice(this.devices[0]);
  }

  /**
   * Add Single Device
   * @param {DeviceDataModel} deviceData - data device
   * @return {*} instance device yang di add
   */
  addDevice(deviceData) {
    // Tambah device marker baru ke map
    const deviceMarker = L.marker({
      lat: deviceData.latitude,
      lon: deviceData.longitude,
    }).addTo(this.map);

    deviceMarker.addEventListener("click", this.onDeviceClickHandler);

    // Konversi device baru ke Standar Device Model
    const newDeviceModel = DeviceModel({
      deviceMarker: deviceMarker,
      deviceData: deviceData,
    });

    // Tambah device baru ke koleksi device
    this.devices.push(newDeviceModel);

    return newDeviceModel;
  }

  /**
   * Remove Single Device
   * @param {*} device - device yang hendak diremove
   * @return {boolean} Success enggaknya diremove
   */
  removeDevice(device) {
    if (device) {
      device.deviceMarker.removeEventListener(
        "click",
        this.onDeviceClickHandler
      );

      // Hapus dari peta
      device.deviceMarker.removeFrom(this.map);

      // Remove device dari array
      this.devices.splice(this.devices.indexOf(device), 1);

      return true;
    } else {
      return false;
    }
  }

  /**
   * Remove All Device
   */
  removeAllDevice() {
    for (let i = 0; i < this.devices.length; i++) {
      this.devices[i].deviceMarker.removeEventListener(
        "click",
        this.onDeviceClickHandler
      );

      // Hapus dari peta
      this.devices[i].deviceMarker.removeFrom(this.map);
    }
    // this.devices.splice(0, this.devices.length);
    this.devices = [];
  }

  /**
   * Handler when user click on device on map
   * @param {*} e - Click parameter
   */
  onDeviceClickHandler = (e) => {
    if (e) {
      console.log(e);
      const popup = L.popup();
      popup
        .setLatLng(e.latlng)
        .setContent("Koordinat:" + e.latlng.toString())
        .openOn(this.map);
    }
  };
}
