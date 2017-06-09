import { Component } from '@angular/core';

import { WebserviceService } from './servicios/webservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';    
  cuenta='pdececco';
  password='72256';
  datosTraidos;
    constructor(private WebserviceService : WebserviceService) {        
    }

  submit(){
  console.info('in')
}
  TraerPersonas(){
    this.WebserviceService.TraerPersonas()
      .then(data => {        
        this.datosTraidos = data;        
        if(this.cuenta==this.datosTraidos[0].cuenta && this.password==this.datosTraidos[0].password ){
          console.warn('ADENTRO')
        }else{
          console.warn('ERROR')
        }
      }) 
      .catch(error => {
        console.log(error);
      });
  }
}
 