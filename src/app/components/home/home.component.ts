import { Component, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import dataFotos from '../../dataFoto.json';
import { MscvServiceService } from '../../servicio/mscv-service.service';
import { MongoServiceService } from '../../servicioBD/mongo-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public dataFotosSeteada : any = [];
  public dataAzure : any = [];
  public dataFinal : any = [];
  public elementoEditar = 0;
  public edificios = ["A","E","F","G","H","I","J","K"];
  public edificio = Number(this.route.snapshot.paramMap.get('edificio'));
  public statusContainerEdicion = false;
  public statusContainerPrincipal = true;
  public imgAsistencia = "../../../assets/iconsStatus/accept.png";
  public imgFalta = "../../../assets/iconsStatus/close.png";
  public imgRevisar = "../../../assets/iconsStatus/warning.png";

  

  constructor(private _msService : MscvServiceService, private route: ActivatedRoute, private renderer: Renderer2, private _mongoService : MongoServiceService){}
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
    },11000)

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
        //! Validamos el porcentaje de coincidencia
        if (prediccion[1] > 0.9900000) {
          this.armarObjetos(index,prediccion,"Asistencia",this.imgAsistencia);
        }else if (prediccion[1] > 0.5000000 && prediccion[1] < 0.9899999) {
          this.armarObjetos(index,prediccion,"Revisar",this.imgRevisar);
        }else if (prediccion[1] === undefined) {
          this.armarObjetos(index,prediccion,"Falta",this.imgFalta);
        }
      }, 10000);
    }
    console.log(this.dataFinal);
  }

  registrarDatosBD = () =>{
    let fechaSistema = new Date();
    let dia = fechaSistema.getDate()
    let mes = fechaSistema.getMonth();
    let anio = fechaSistema.getFullYear();
    let hora = fechaSistema.getHours();
    let horaJSON = `${hora}:00 - ${hora+1}:00`;
    let fecha = `${dia}/${mes}/${anio}`;

    //? Es la data que se envía al modelo, en data, enviamos directamente todo los elementos de la data Final
    let data = {
      "edificio": this.edificios[this.edificio],
      "hora": horaJSON,
      "fecha" : fecha,
      "data" : this.dataFinal
    }
    //? Llamamos el servicio para registrar y le enviamos la data previamente construida
    this._mongoService.registrarInformacion(data).subscribe((resp: any) => {
      alert("Registrado");
    });
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
    this.registrarDatosBD();
    let itemsModificar = document.querySelectorAll(".Revisar");
    for (let index = 0; index < itemsModificar.length; index++) {
      this.renderer.setStyle(itemsModificar[index], 'background', '#4e96e2');

      itemsModificar[index].addEventListener("click", e =>{
        let id = itemsModificar[index].getAttribute("id");
        this.editarElemento(id);
      });
    }
    this.colorearFalta();
  }

  colorearFalta = () =>{
    let itemsFalta = document.querySelectorAll(".Falta");
    for (let index = 0; index < itemsFalta.length; index++) {
      this.renderer.setStyle(itemsFalta[index], 'background', '#b33b47');
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
