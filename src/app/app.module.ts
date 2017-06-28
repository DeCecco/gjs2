import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WebserviceService } from './servicios/webservice.service';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LoginComponent } from './login/login.component';


const appRoutes: Routes = [
  /*{
    path: 'pagina1',
    canActivate: [VerificarJWTService],
    component: Pagina1Component
  },
  { path: 'pagina2', component: Pagina2Component, canActivate: [VerificarJWTService], },
  { path: '**', component: LoginComponent },
  { path: '',   redirectTo: '/pagina1', pathMatch: 'full' },*/
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [WebserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
