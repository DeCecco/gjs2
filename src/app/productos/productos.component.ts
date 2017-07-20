import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../servicios/webservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  formProductos: FormGroup;
  descripcion_corta: string;
  descripcion_larga: string;
  precio_costo: Float32Array;
  precio_venta: Float32Array;
  idprod:number;
  disa: boolean;
  constructor(private WebserviceService: WebserviceService, private router: Router, public formBuilder: FormBuilder) {
    this.lista = [];
    this.cantidad = 0;
    this.disa = false;
    this.existenP = false;
    this.formProductos = formBuilder.group({
      //VALIDACIONES      
      descripcion_corta: [this.descripcion_corta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      descripcion_larga: [this.descripcion_larga, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z ]+$')])],
      precio_costo: [this.precio_costo, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      precio_venta: [this.precio_venta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],

    });
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
  eliminarProducto(x) {
    console.info(x)
  }
  modificarProducto(x) {
    console.info(x)
    this.disa = false;
  }
  alta() {
    this.descripcion_corta ='';
    this.descripcion_larga ='';
    this.precio_costo;
    this.precio_venta;
    this.disa = true;
  }
  update(x) {
    var array = [{
      "descripcion_corta": this.descripcion_corta, "descripcion_larga": this.descripcion_larga, "precio_costo": this.precio_costo,
      "precio_venta": this.precio_venta, "idprod": this.idprod
    }];
    if (x == 1) {
      /*this.WebserviceService.ModificarProducto(array).then(data => {
        if (data.ok) {
          window.location.reload();
        } else {
          alert('error al grabar');
        }
      })*/
    } else {
      this.WebserviceService.AgregarProducto(array).then(data => {
        if (data.ok) {
          window.location.reload();
        } else {
          alert('error al grabar');
        }
      })
    }
  }
}
