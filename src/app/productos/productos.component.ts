import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  listadoProductos:any;
  constructor(private WebserviceService: WebserviceService) { }

  ngOnInit() {
    this.WebserviceService.ListarProductos().then(data=>{
      console.info(data)
      this.listadoProductos=data;
    })
  }

}
