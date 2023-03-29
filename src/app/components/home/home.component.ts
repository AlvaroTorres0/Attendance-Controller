import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dataFotos from '../../dataFoto.json';
import { MscvServiceService } from '../../servicio/mscv-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private _msService : MscvServiceService, private route: ActivatedRoute, private renderer: Renderer2){}
  public dataFotosSeteada : any = [];
  public dataAzure : any = [];
  public dataFinal : any = [];
  public elementoEditar = 0;
  public edificios = ["A","E","F","G","H","I","J","K"];
  public edificio = Number(this.route.snapshot.paramMap.get('edificio'));
  public dataString = "";
  public statusContainerEdicion = false;
  public statusContainerPrincipal = true;
  public imgAsistencia = "../../../assets//iconsStatus/accept.png";
  public imgFalta = "../../../assets//iconsStatus/close.png";
  public imgRevisar = "../../../assets//iconsStatus/warning.png";

  ngOnInit(): void {
    this.metodoPrincipal();

  }
  metodoPrincipal = () =>{
    this.dataFotosSeteada = [];
    this. dataAzure = [];
    this. dataFinal = [];
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
      }, 4000);
    }
    console.log(this.dataFinal);
  }

  convertirDataFinalAString(){
    this.dataString = "";
    let iteracion = 0;
    let inicio = '{ "21/03/2023": [';
    let final = "] }";

    for (const iterator of this.dataFinal) {
      iteracion ++;
      // Convertimos cada objetos de la dataFinal a string y lo concatenamos a la data String
      this.dataString += JSON.stringify(iterator);
      if (iteracion != this.dataFinal.length) {
        this.dataString+=",";
      }
    }
    let dataStringFinal = inicio+this.dataString+final;
    return dataStringFinal;
  }

  crearArchivoJSON = () =>{
    let dataString = this.convertirDataFinalAString();
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
    this.statusContainerPrincipal = false;
    this.statusContainerEdicion = true;

  }

  //* Agrega un listener a los elementos que tienen la clase falta (cambiar a revisar después) y manda el id a editar elemento
  agregarEventoModificar = () =>{
    //! Creamos el archivo JSON con la data Final
    //!  this.crearArchivoJSON();
    let itemsModificar = document.querySelectorAll(".Falta");
    for (let index = 0; index < itemsModificar.length; index++) {
      this.renderer.setStyle(itemsModificar[index], 'background', '#b33b47');

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
