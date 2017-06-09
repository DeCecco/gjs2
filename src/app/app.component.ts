import { Component } from '@angular/core';

import { WebserviceService } from './servicios/webservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';    
  cuenta='Pablo';
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
        console.info(data);
        this.datosTraidos = data;
      }) 
      .catch(error => {
        console.log(error);
      });
  }
}
 