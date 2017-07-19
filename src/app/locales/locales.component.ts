import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {
  lista:any;
  constructor(private WebserviceService: WebserviceService) { }

  ngOnInit() {
    this.WebserviceService.ListarLocales().then(data=>{
      console.info(data)
      this.lista=data;
      
    })
  }
  modificar(x){
    console.info(x)
  }
  alta(){
    
  }
}
