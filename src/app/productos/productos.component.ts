import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  existenP: boolean;
  constructor(private WebserviceService: WebserviceService, private router: Router) {
    this.lista = [];
    this.cantidad = 0;
    this.existenP = false;

    var tk = localStorage.getItem('Token')
    if (tk == null) {
      alert('Por favor, para continuar logueese');
      this.router.navigate(['Login']);
    } else {
      var array = [{ "token": tk }];
      this.WebserviceService.VerificarToken(array).then(data => {
        if (data) {
          console.info('TokenActivo')
        } else {
          alert('Por favor, para continuar logueese');
          this.router.navigate(['Login']);
          console.info('TokenVencido')
        }
      })
    }
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
    if (this.pedidos.length > 0) {
      this.existenP = true;
    } else {
      this.existenP = false;
    }
  }
  eliminar(pizza) {
    var BreakException = {};
    try {
      var cont = 0;
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
    if (this.pedidos.length > 0) {
      this.existenP = true;
    } else {
      this.existenP = false;
    }
  }
}
