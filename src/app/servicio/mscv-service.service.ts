import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MscvServiceService {

  constructor(private _http : HttpClient) { }

  public evaluarImagen(urlImage:any){
    const API = "https://eastus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/ac10a854-90a9-47d1-a636-9cecf0d7f3dd/detect/iterations/AttendanceController/url"
    const headers = new HttpHeaders(
      {
        'Prediction-Key' : '45d7135e87f74cf5b6bfe9ffcc5ee8be',
        'Content-Type': 'application/json'
      }
    );
    return this. _http.post(API, {url: urlImage}, {headers: headers});
  }
}
