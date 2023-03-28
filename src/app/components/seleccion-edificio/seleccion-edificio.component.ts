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
      img: '../../../assets/edificios/A.jpg',
      posicion: "0"
    },
    {
      edificio: "E",
      img: '../../../assets/edificios/E.jpg',
      posicion: "1"
    },
    {
      edificio: "F",
      img: '../../../assets/edificios/F.jpg',
      posicion: "2"
    },
    {
      edificio: "G",
      img: '../../../assets/edificios/G.jpg',
      posicion: "3"
    },
    {
      edificio: "H",
      img: '../../../assets/edificios/H.jpg',
      posicion: "4"
    },
    {
      edificio: "I",
      img: '../../../assets/edificios/I.jpg',
      posicion: "5"
    },
    {
      edificio: "J",
      img: '../../../assets/edificios/J.jpg',
      posicion: "6"
    },
    {
      edificio: "K",
      img: '../../../assets/edificios/K.jpg',
      posicion: "7"
    }
  ]
  constructor(){}
  
  ngOnInit(): void {
    
  }
}
