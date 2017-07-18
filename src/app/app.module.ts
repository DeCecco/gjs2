import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WebserviceService } from './servicios/webservice.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './login/login.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ProductosComponent } from './productos/productos.component';

import { ButtonRenderComponent } from './button-render.component';
import { ImageRenderComponent } from './image-render.component'; 
import { ModalModule } from "ng2-modal";
import { SelectModule } from 'angular2-select';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ReactiveFormsModule  } from '@angular/forms'

const appRoutes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Usuarios', component: UsuariosComponent },
  { path: 'Productos', component: ProductosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    ButtonRenderComponent,
    ImageRenderComponent,
    ProductosComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    SelectModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2SmartTableModule

  ],
  entryComponents: [
    ButtonRenderComponent,
    ImageRenderComponent
  ],
  providers: [WebserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
