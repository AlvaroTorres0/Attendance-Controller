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
  public elementoEditar = 0;
  public edificios = ["A","B","C","D","E","F","G","H","I","J","K"];
  public edificio = 0;
  public statusContainerClassrooms = true;
  public statusContainerEdicion = false;
  public imgAsistencia = "../../../assets//iconsStatus/accept.png";
  public imgFalta = "../../../assets//iconsStatus/close.png";
  public imgRevisar = "../../../assets//iconsStatus/warning.png";

  ngOnInit(): void { 
    this.crearDataAzure();
    setTimeout(()=>{
      this.agregarEventoModificar();
    },5000)
  }

  crearDataAzure(){
    //* Seteamos la data de nuestro archivo para poder trabajar con ella
    this.dataFotosSeteada = Object.values(dataFotos);
    let longitud = this.dataFotosSeteada[this.edificio].length;
    
    //* Enviamos la URL de la fotografía al método que envía al servicio
    for (let index = 0; index < longitud; index++) {
      //* Contiene la información devuelta de Azure
      let prediccion = this.analizarImagen(this.dataFotosSeteada[this.edificio][index].fotografia.url);

      //* Es para esperar a la data de Azure y que la data final no se arme antes.
      setTimeout(() => {
        // Validamos el porcentaje de coincidencia
        if (prediccion[1] > 0.9800000) {
          this.armarObjetos(index,prediccion,"Asistencia",this.imgAsistencia);                    
        }else if (prediccion[1] > 0.5000000 && prediccion < 0.9799999) {
          this.armarObjetos(index,prediccion,"Revisar",this.imgRevisar);
        }else{
          this.armarObjetos(index,prediccion,"Falta",this.imgFalta);
        }
      }, 3000);
    }
    console.log(this.dataFinal);
    
  }

  //* Crea objetos que se agregan a la data final
  armarObjetos(index : any, prediccion : any, asistencia : string, img : string){
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
        coincidencia: String(prediccion[1]),
        asistencia: asistencia,
        imgStatus: img
      }     
    }
    this.dataFinal.push(nuevaData)
  }

  //* Analiza las imágenes con la URL
  analizarImagen(url : String){
    let dataPrediccion : any = []
    //* Llamamos el método del servicio
    this._msService.evaluarImagen(url).subscribe(resp=>{
      //* Seteamos la respuesta
      this.dataAzure = Object.values(resp);
      //* La asignamos a un arreglo
      dataPrediccion.push(this.dataAzure[0])
      dataPrediccion.push(this.dataAzure[4][0].probability)
    });
    return dataPrediccion;     
  }

  //* Recibe el id y se le asigna a elemento a editar para tomarla desde el componente revisar
  editarElemento(id : any){
    this.elementoEditar = id;
    this.statusContainerClassrooms = false;
    this.statusContainerEdicion = true;
  }

  //* Agrega un listener a los elementos que tienen la clase falta (cambiar a revisar después) y manda el id a editar elemento
  agregarEventoModificar = () =>{
    let itemsModificar = document.querySelectorAll(".Falta");
    for (let index = 0; index < itemsModificar.length; index++) { 
      itemsModificar[index].addEventListener("click", e =>{
        let id = itemsModificar[index].getAttribute("id");
        this.editarElemento(id);
      });   
    }
  }


  cambiarEdificio = (direccion : Boolean) =>{
    if (direccion) {
      this.edificio+=1;
    }else{
      this.edificio-=1;
    }  
  }
  
}