import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MongoServiceService {
  public url = "http://localhost:3000";
  constructor(private _peticion : HttpClient) {}


  registrarInformacion = (body:any) =>{
    let url = `${this.url}/registro`;
    return this._peticion.post(url,body);
  }
}