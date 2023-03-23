import { Component } from '@angular/core';
import { RevisarComponent } from '../revisar/revisar.component';

@Component({
  selector: 'app-foto-pcompleta',
  templateUrl: './foto-pcompleta.component.html',
  styleUrls: ['./foto-pcompleta.component.css']
})
export class FotoPcompletaComponent {
  public dataElemento : any = {};
  public foto = "";
  public statusPantalla = true;
  public statusRevision = false;

  constructor(private _revisar : RevisarComponent){}

  ngOnInit(): void {
    this.dataElemento = this._revisar.dataElementoEditar;
    this.foto = this.dataElemento.fotografia.url;
  }

  regresarRevision = () =>{
    this.statusPantalla = false;
    this.statusRevision = true;
  }
}
