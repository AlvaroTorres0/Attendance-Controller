import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public fecha = "";
  constructor(){
    

  }

  ngOnInit(): void {
    setInterval(this.actualizarFecha,2000);
  }

  actualizarFecha = () =>{
    let fechaSistema = new Date();
    let hora = fechaSistema.getHours();
    let minutos = fechaSistema.getMinutes();
    this.fecha = `${hora}:${minutos}`;
  }
}
