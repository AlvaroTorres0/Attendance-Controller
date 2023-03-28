import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-revisar',
  templateUrl: './revisar.component.html',
  styleUrls: ['./revisar.component.css']
})
export class RevisarComponent {
  //* Se toma el elemento al que se le dio clic
  public modificar = this._home.elementoEditar;
  public dataElementoEditar : any = {};
  public statusFotoPcompleta = false;
  public statusPrincipal = true;
  public edificio = this._home.edificio;

  constructor(private _home : HomeComponent){}

  ngOnInit(): void {
    //* Se crea una nueva data con la data final de Home en la posición del elemento que se le dio clic
    this.dataElementoEditar = this._home.dataFinal[this.modificar];
  }

  mostrarEnPantallaCompleta = () =>{
    this.statusPrincipal = false;
    this.statusFotoPcompleta = true;
  }
}
