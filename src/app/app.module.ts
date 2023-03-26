import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RevisarComponent } from './components/revisar/revisar.component';
import { FotoPcompletaComponent } from './components/foto-pcompleta/foto-pcompleta.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SeleccionEdificioComponent } from './components/seleccion-edificio/seleccion-edificio.component';
import { BarraBusquedaComponent } from './components/barra-busqueda/barra-busqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RevisarComponent,
    FotoPcompletaComponent,
    NavbarComponent,
    SeleccionEdificioComponent,
    BarraBusquedaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
