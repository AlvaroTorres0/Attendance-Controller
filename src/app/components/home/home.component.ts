import { Component } from '@angular/core';
import dataFotos from '../../dataFoto.json';
import { MscvServiceService } from '../../servicio/mscv-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private _msService : MscvServiceService){}
  public dataFotosSeteada : any = [];
  public dataAzure : any = [];
  public dataFinal : any = [];
  public edificios = ["A","B","C","D","E","F","G","H","I","J","K"];
  public edificio = 0;

  ngOnInit(): void { 
    this.crearDataAzure()
  }

  crearDataAzure(){
    // Seteamos la data de nuestro archivo para poder trabajar con ella
    this.dataFotosSeteada = Object.values(dataFotos);
    let longitud = this.dataFotosSeteada[this.edificio].length;
    
    // Enviamos la URL de la fotografía al método que envía al servicio
    for (let index = 0; index < longitud; index++) {
      // Contiene la información devuelta de Azure
      let prediccion = this.analizarImagen(this.dataFotosSeteada[this.edificio][index].fotografia.url);

      // Es para esperar a la data de Azure y que la data final no se arme antes.
      setTimeout(() => {
        this.armarObjetos(index,prediccion);
      }, 3000);
    }
    console.log(this.dataFinal);
  }

  // Crea objetos que se agregan a la data final
  armarObjetos(index : any, prediccion : any){
    let nuevaData = {}
    nuevaData = {
      horario: this.dataFotosSeteada[this.edificio][index].horario,
      edificio: this.edificios[this.edificio],
      aula: this.dataFotosSeteada[this.edificio][index].aula,
      materia: this.dataFotosSeteada[this.edificio][index].materia,
      docente: this.dataFotosSeteada[this.edificio][index].docente,
      fotografia: {
        url: this.dataFotosSeteada[this.edificio][index].fotografia.url,
        hora: this.dataFotosSeteada[this.edificio][index].fotografia.hora
      },
      analisis: {
        id: prediccion[0],
        coincidencia: prediccion[1]
      }     
    }
    this.dataFinal.push(nuevaData)
  }

  // Analiza las imágenes con la URL
  analizarImagen(url : String){
    let dataPrediccion : any = []
    // Llamamos el método del servicio
    this._msService.evaluarImagen(url).subscribe(resp=>{
      // Seteamos la respuesta
      this.dataAzure = Object.values(resp);
      // La asignamos a un arreglo
      dataPrediccion.push(this.dataAzure[0])
      dataPrediccion.push(String(this.dataAzure[4][0].probability))
    });
    return dataPrediccion;     
  }

  cambiarEdificio = (direccion : Boolean) =>{
    if (direccion) {
      this.edificio+=1;
    }else{
      this.edificio-=1;
    }  
  }
}