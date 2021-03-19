/** Function membuat object device */
export function DeviceModel({
  deviceMarker,
  deviceData: { latitude, longitude, heartrate },
}) {
  return {
    deviceMarker: deviceMarker,
    deviceData: DeviceDataModel({ latitude, longitude, heartrate }),
  };
}

/** Function membuat object device data */
export function DeviceDataModel({ latitude, longitude, heartrate }) {
  return {
    latitude: latitude,
    longitude: longitude,
    heartrate: heartrate,
  };
}
