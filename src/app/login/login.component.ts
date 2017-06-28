import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cuenta='pdececco';
  password='72256';
  datosTraidos;
  constructor(private WebserviceService : WebserviceService) { }

  ngOnInit() {
  }
  TraerPersonas(){
    this.WebserviceService.TraerPersonas()
      .then(data => {        
        console.info(data);
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
