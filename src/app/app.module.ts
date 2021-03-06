//Nativos
import { BrowserModule, } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

//Servicios
import { WebserviceService } from './servicios/webservice.service';

//Proveedores
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ChartsModule } from 'ng2-charts';
import { ImageRenderComponent } from './image-render.component';
import { ModalModule } from 'ng2-modal';
import { SelectModule } from 'angular2-select';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule } from '@angular/forms';
import { NguiMapModule } from '@ngui/map';
import { Ng2UploaderModule } from 'ng2-uploader';
import { RecaptchaModule } from 'ng-recaptcha';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';

//Componentes
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';
import { ButtonRenderComponent } from './button-render.component';
import { LocalesComponent } from './locales/locales.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AcercadeComponent } from './acercade/acercade.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { LoadingModule } from 'ngx-loading';

const appRoutes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Usuarios', component: UsuariosComponent },
  { path: 'Productos', component: ProductosComponent },
  { path: 'Locales', component: LocalesComponent },
  { path: 'Estadisticas', component: EstadisticasComponent },
  { path: 'Pedidos', component: PedidosComponent },
  { path: 'AcercaDe', component: AcercadeComponent },
  { path: 'Encuesta', component: EncuestaComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    ButtonRenderComponent,
    ImageRenderComponent,
    ProductosComponent,
    LocalesComponent,
    EstadisticasComponent,
    PedidosComponent,
    AcercadeComponent,
    EncuestaComponent
  ],
  imports: [
    NgxCarouselModule,
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    SelectModule,
    HttpModule,
    Ng2UploaderModule,
    ChartsModule,
    LoadingModule,
    RouterModule.forRoot(appRoutes),
    Ng2SmartTableModule,
    RecaptchaModule.forRoot(),
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBZPpjpLrJRPNwPimYSEBRErThcxu9oEZs' })

  ],
  entryComponents: [
    ButtonRenderComponent,
    ImageRenderComponent
  ],
  providers: [WebserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
