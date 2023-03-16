import { Component } from '@angular/core';
import data from '../../dataFoto.json';
import { MscvServiceService } from '../../servicio/mscv-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private _msService : MscvServiceService){}

  ngOnInit(): void { 
    this.analizarImagen()
  }

  analizarImagen = () =>{
    this._msService.evaluarImagen("https://raw.githubusercontent.com/AlvaroTorres0/15-03-2023/main/E4(15-03-2023).jpg").subscribe(data=>{
      console.log(data);
    });
  }
}