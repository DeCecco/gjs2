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

import { Ng2SmartTableModule } from 'ng2-smart-table';

const appRoutes: Routes = [  
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    Ng2SmartTableModule,
  ],
  providers: [WebserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
