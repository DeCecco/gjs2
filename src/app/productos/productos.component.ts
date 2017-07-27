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
  formPedido: FormGroup;
  descripcion_corta: string;
  descripcion_larga: string;
  precio_costo: Float32Array;
  precio_venta: Float32Array;
  idprod: number;
  disa: boolean;
  ptotal: number;
  calle: string;
  ciudad: string;
  dpto: string;
  entrecalles: string;
  localidad: string;
  cmbClientes = [];
  cliente: string;
  numero: number;
  piso: string;
  comentarios: string;
  rolId;
  idusuarioC: string;
  usuario: string;
  promocion:boolean;
  constructor(private WebserviceService: WebserviceService, private router: Router, public formBuilder: FormBuilder) {
    this.ptotal = 0;
    this.lista = [];
    this.cantidad = 0;
    this.disa = false;
    this.existenP = false;
    this.promocion=false;
    this.comentarios = '';
    this.rolId = localStorage.getItem('Rol')
    var array = [{ "token": localStorage.getItem('Token') }];

    this.WebserviceService.PayLoad(array).then(data => {      
      this.usuario = data.data.idusuario;      
    })

    this.formProductos = formBuilder.group({
      //VALIDACIONES      
      descripcion_corta: [this.descripcion_corta, Validators.compose([Validators.required, Validators.maxLength(80), Validators.pattern('^[A-Z a-z0-9ÑñáéíóúÁÉÍÓÚ\\-\\#]+$')])],
      descripcion_larga: [this.descripcion_larga, Validators.compose([Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z,. ]+$')])],
      precio_costo: [this.precio_costo, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      precio_venta: [this.precio_venta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      promocion:[this.promocion]

    });
    this.formPedido = formBuilder.group({

      localidad: [Validators.compose([Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z,.´ ]+$')])],
      calle: [Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z,. ]+$')])],
      numero: [Validators.compose([Validators.required, Validators.maxLength(5), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      piso: [Validators.compose([Validators.required, Validators.maxLength(4), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      dpto: [Validators.compose([Validators.required, Validators.maxLength(3), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      entrecalles: [Validators.compose([Validators.required, Validators.maxLength(80), Validators.pattern('^[a-zA-Z,.´ ]+$')])],
      comentarios: [Validators.compose([Validators.required, Validators.maxLength(200), Validators.pattern('^[a-zA-Z,.´ ]+$')])],

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


    var contenido = 0;
    if (typeof this.pedidos != 'undefined') {
      contenido = 1;
      this.lista.push(pizza);
    } else {
      this.lista.push(pizza);
    }
    this.pedidos = this.lista;

    this.ptotal = this.ptotal + parseInt(pizza.precio_venta);

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
          this.ptotal = this.ptotal - pizza.precio_venta;
          this.pedidos.splice(cont, 1);
          throw BreakException;
        }
        cont++;
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }
    if (this.pedidos.length > 0) {
      this.existenP = true;
    } else {
      this.existenP = false;
    }
  }
  eliminarProducto(x) {
    this.idprod = x.idprod;
    var array = [{ "idprod": this.idprod }];
    this.WebserviceService.EliminarProducto(array).then(data => {
      if (data.ok) {
        window.location.reload();
      } else {
        alert('error al grabar');
      }
    })
  }
  modificarProducto(x) {
    console.info(x)
    this.descripcion_corta = x.descripcion_corta;
    this.descripcion_larga = x.descripcion_larga;
    this.precio_costo = x.precio_costo;
    this.precio_venta = x.precio_venta;
    this.idprod = x.idprod;
    this.promocion = x.esoferta;
    this.disa = false;
  }
  alta() {
    this.descripcion_corta = '';
    this.descripcion_larga = '';
    this.precio_costo;
    this.precio_venta;
    this.promocion=false;
    this.disa = true;
  }
  update(x) {    
    var array = [{
      "descripcion_corta": this.descripcion_corta, "descripcion_larga": this.descripcion_larga, "precio_costo": this.precio_costo,
      "precio_venta": this.precio_venta, "idprod": this.idprod,"promocion":this.promocion
    }];
    
    if (x == 1) {
      this.WebserviceService.ModificarProducto(array).then(data => {
        if (data.ok) {
          window.location.reload();
        } else {
          alert('error al grabar');
        }
      })
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

  confirmar() {


    if (this.rolId != '4') {

      this.comboClientes();
    } else {
      var array = [{ "token": localStorage.getItem('Token') }];
      this.WebserviceService.PayLoad(array).then(data => {

        this.datosCliente(data.data.idusuario);
      })

    }

    console.info(this.pedidos)
    console.info(this.ptotal)
  }
  comboClientes() {

    var array = [];
    array.push({ 'value': 0, 'label': 'Nuevo Cliente' });
    this.WebserviceService.cmbClientes().then(data => {
      data.forEach(element => {

        var array2 = {};
        array2['value'] = element['idusuario'];
        array2['label'] = element['nombre'];
        array.push(array2);
      });
      console.info(array)
      this.cmbClientes = array;
    })
  }
  datosCliente(x) {
    this.idusuarioC = x;
    if (x != 0) {
      var dt = [{ "idusuario": x }];
      this.WebserviceService.datosCliente(dt).then(data => {
        this.calle = data[0].calle;
        this.ciudad = data[0].ciudad;
        this.dpto = data[0].dpto;
        this.entrecalles = data[0].entrecalles;
        this.localidad = data[0].localidad;
        this.numero = data[0].numero;
        this.piso = data[0].piso;

      })
    }
  }
  confirmarPedido() {
    var local = localStorage.getItem('Local');
    
    var data = [{
      "localidad": this.localidad, "calle": this.calle, "numero": this.numero, "piso": this.piso,
      "dpto": this.dpto, "entrecalles": this.entrecalles, "comentarios": this.comentarios, "idusuarioC": this.idusuarioC
      , "local": local,"idusuario":this.usuario
    }];

    this.WebserviceService.NuevoPedido(data,this.pedidos).then(data=>{
      if (data.ok) {
          window.location.reload();
        } else {
          alert('error al grabar');
        }
    })

  }
}
