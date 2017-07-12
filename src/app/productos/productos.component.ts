import { Component, OnInit } from '@angular/core';

import { WebserviceService } from '../servicios/webservice.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  listadoProductos: any;
  pedidos: any;
  lista: string[];
  cantidad: number;
  constructor(private WebserviceService: WebserviceService) {
    this.lista = [];
    this.cantidad = 0;
  }

  ngOnInit() {
    this.WebserviceService.ListarProductos().then(data => {
      this.listadoProductos = data;
    })
  }
  agregar(pizza) {

    if (typeof this.pedidos != 'undefined') {
      this.lista.push(pizza);
    } else {
      this.lista.push(pizza);
    }
    this.pedidos = this.lista;
  }
  eliminar(pizza) {
    var BreakException = {};
    try {
    this.pedidos.forEach(element => {
      console.info(element.idprod)
      if (element.idprod == pizza.idprod) {
        console.warn('false')
        throw BreakException;

      } else {
        console.warn('true')

      }
    });
     } catch (e) {
      if (e !== BreakException) throw e;
    }  
  }
}
