import { Component } from '@angular/core';

@Component({
  selector: 'app-seleccion-edificio',
  templateUrl: './seleccion-edificio.component.html',
  styleUrls: ['./seleccion-edificio.component.css']
})
export class SeleccionEdificioComponent {
  public edificios = [
    {
      edificio: "A",
      img: '../../../assets/login-hero3.JPG',
      posicion: "0"
    },
    {
      edificio: "E",
      img: '../../../assets/login-hero3.JPG',
      posicion: "1"
    },
    {
      edificio: "F",
      img: '../../../assets/login-hero3.JPG',
      posicion: "2"
    },
    {
      edificio: "G",
      img: '../../../assets/login-hero3.JPG',
      posicion: "3"
    },
    {
      edificio: "H",
      img: '../../../assets/login-hero3.JPG',
      posicion: "4"
    },
    {
      edificio: "I",
      img: '../../../assets/login-hero3.JPG',
      posicion: "5"
    },
    {
      edificio: "J",
      img: '../../../assets/login-hero3.JPG',
      posicion: "6"
    },
    {
      edificio: "K",
      img: '../../../assets/login-hero3.JPG',
      posicion: "7"
    }
  ]
  constructor(){}
  
  ngOnInit(): void {
    
  }
}
