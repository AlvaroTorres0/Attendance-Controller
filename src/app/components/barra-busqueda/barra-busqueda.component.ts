import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-barra-busqueda',
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponent {
  public edificio = this._home.edificio;
  constructor(private _home : HomeComponent){}

  ngOnInit(): void {
    console.log(this.edificio);
  }

  edificioAnterior = () =>{
    //* Validamos que el edificio no sea cero, ya que estaría fuera del arreglo
    if (this.edificio !== 0) {
      this.edificio -=1;      
    }
    console.log(this.edificio);
  }
  edificioSiguiente = () =>{
    //* Validamos que el edificio no sea siete, ya que estaría fuera del arreglo
    if (this.edificio !==7) {
      this.edificio +=1;      
    }
    console.log(this.edificio);
  }
}
