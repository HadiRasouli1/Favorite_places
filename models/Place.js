export class place {
  constructor(title, imageUri, location) {
    this.title = title;
    this.imageUri = imageUri;
    // this.address = address;
    this.location = { lat: location.lat, lng: location.lng }; //{lat:0.14543 , lng:127.121}
    this.id = new Date().toString() + Math.random().toString;
  }
}
