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
    let minutosString = "0";
    if (minutos < 10) {
      minutosString += String(minutos);   
      this.fecha = `${hora}:${minutosString}`;  
    }else{
      this.fecha = `${hora}:${minutos}`;
    }
    
  }
}