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
  existenP:boolean;
  constructor(private WebserviceService: WebserviceService) {
    this.lista = [];
    this.cantidad = 0;
    this.existenP=false;
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
    console.info(this.pedidos);
    if(this.pedidos.length>0){
      this.existenP=true;
    }else{
      this.existenP=false;
    }
  }
  eliminar(pizza) {
    var BreakException = {};
    try {
      var cont=0;
    this.pedidos.forEach(element => {   
        
      if (element.idprod == pizza.idprod) {        
        console.info(element)   
        this.pedidos.splice(cont, 1);
        throw BreakException;
      } 
      cont++;
    });
     } catch (e) {
      if (e !== BreakException) throw e;
    }  
    console.warn(this.pedidos);
    if(this.pedidos.length>0){
      this.existenP=true;
    }else{
      this.existenP=false;
    }
  }
}
