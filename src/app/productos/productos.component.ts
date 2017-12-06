import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../servicios/webservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DirectionsRenderer } from '@ngui/map';
import { error } from 'util';
import { NgxCarousel } from 'ngx-carousel';
import { CombineLatestSubscriber } from 'rxjs/operator/combineLatest';
//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
//import { AppModule } from '../app.module';

//platformBrowserDynamic().bootstrapModule(AppModule);

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  directionsRenderer: google.maps.DirectionsRenderer;
  directionsResult: google.maps.DirectionsResult;

  public carouselOne: NgxCarousel;
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
  promocion: boolean;
  uploadFile: any;
  uploadFile2: any;
  uploadFile3: any;
  hasBaseDropZoneOver: boolean = false;
  modoDeViaje = [];
  mdViaje: string;
  sinPedidos: boolean;
  mensajeError: boolean;
  img: string;
  img2: string;
  img3: string;
  paso: boolean;
  titulo: string;
  public loading = false;
  captcha: any;
  options: Object = {
    //url: 'http://localhost/UTN/gjs2/API/file.php' //laburo
    //url: 'http://localhost/UTN/finallab/GJS2/API/file.php' //casa
    url: 'http://buenaaccion.com.ar/UTN/finallab/GJS2/API/file.php' //server



  };
  direction: any = {
    origin: 'Av. Federico Lacroze 3814-3818, C1427EDQ CABA',
    destination: 'Av. Cabildo 356, C1426AAQ CABA',
    travelMode: 'DRIVING'
  };
  sizeLimit = 2000000;

  handleUpload(data, Qimg): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      console.info(data)
      switch (Qimg) {
        case 1:
          this.uploadFile = data;
          break;
        case 2:
          this.uploadFile2 = data;
          break;
        case 3:
          this.uploadFile3 = data;
          break;
      }

      // tslint:disable-next-line:no-console
      console.info('http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/' + this.uploadFile.originalName)
      alert('Archivo subido con exito')
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      alert('El archivo es muy pesado!');
    }
  }
  constructor(private WebserviceService: WebserviceService, private router: Router, public formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {
    this.loading = true;
    this.ptotal = 0;
    this.lista = [];
    this.cantidad = 0;
    this.disa = false;
    this.existenP = false;
    this.promocion = false;
    this.comentarios = '';
    this.sinPedidos = false;
    this.paso = false;
    this.mensajeError = false;
    this.titulo = 'Productos';
    this.rolId = localStorage.getItem('Rol');
    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 1,
      touch: true,
      loop: true,
      custom: 'banner'
    }
    var array = [{ "token": localStorage.getItem('Token') }];
    this.modoDeViaje = [
      { value: 'DRIVING', label: 'Auto' },
      { value: 'WALKING', label: 'Caminando' },
      { value: 'BICYCLING', label: 'Bicicleta' },
      { value: 'TRANSIT', label: 'Transporte Público' }
    ];
    this.mdViaje = 'DRIVING';
    this.WebserviceService.PayLoad(array).then(data => {
      this.usuario = data.data.idusuario;
    })

    this.formProductos = formBuilder.group({
      //VALIDACIONES      
      descripcion_corta: [this.descripcion_corta, Validators.compose([Validators.required, Validators.maxLength(80), Validators.pattern('^[A-Z a-z0-9ÑñáéíóúÁÉÍÓÚ\\-\\#]+$')])],
      descripcion_larga: [this.descripcion_larga, Validators.compose([Validators.required, Validators.maxLength(200)])],
      precio_costo: [this.precio_costo, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      precio_venta: [this.precio_venta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      promocion: [this.promocion]

    });
    this.formPedido = formBuilder.group({

      localidad: [Validators.compose([Validators.required, Validators.maxLength(40), Validators.pattern('^[a-zA-Z,.´ ]+$')])],
      calle: [Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern('^[a-zA-Z,. ]+$')])],
      numero: [Validators.compose([Validators.required, Validators.maxLength(5), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      piso: [Validators.compose([Validators.maxLength(4), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      dpto: [Validators.compose([Validators.maxLength(3), Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      entrecalles: [Validators.compose([Validators.maxLength(80), Validators.pattern('^[a-zA-Z,.´ ]+$')])],
      comentarios: [Validators.compose([Validators.maxLength(200), Validators.pattern('^[a-zA-Z,.´ ]+$')])],
      captcha: [this.captcha]

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
    this.listarprod();
  }
  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
  }
  listarprod() {
    this.WebserviceService.ListarProductos().then(data => {
      this.listadoProductos = data;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }
  directionsChanged() {
    this.directionsResult = this.directionsRenderer.getDirections();
    this.cdr.detectChanges();

  }

  showDirection() {
    // tslint:disable-next-line:one-line
    try {
      this.directionsRendererDirective['showDirections'](this.direction);
      this.cdr.detectChanges();
    } catch (error) {
      alert('Por favor, defina una ruta correcta');
    }

  }
  cambio() {

    this.direction.travelMode = this.mdViaje;
    this.direction.destination = this.calle + ' ' + this.numero + ', ' + this.localidad;
    this.showDirection();
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
    this.titulo = "Modificar Producto"
    this.descripcion_corta = x.descripcion_corta;
    this.descripcion_larga = x.descripcion_larga;
    this.precio_costo = x.precio_costo;
    this.precio_venta = x.precio_venta;
    this.idprod = x.idprod;
    this.promocion = x.esoferta;
    this.img = x.imagen;
    this.img2 = x.imagen2;
    this.img3 = x.imagen3;
    this.disa = false;
  }
  alta() {
    this.titulo = "Alta de Producto"
    this.descripcion_corta = '';
    this.descripcion_larga = '';
    this.precio_costo = null;
    this.precio_venta = null;
    this.promocion = false;
    this.img = null;
    this.img2 = null;
    this.img3 = null;
    this.disa = true;
  }
  update(x) {
    if (typeof this.uploadFile == 'undefined') {
      var imagenF = 'http://pablodececco.com.ar/assets/img/peppy.jpg';
    } else {
      var imagenF = "http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/" + this.uploadFile.originalName;
    }
    if (typeof this.uploadFile2 == 'undefined') {
      var imagenF2 = 'http://pablodececco.com.ar/assets/img/peppy.jpg';
    } else {
      var imagenF2 = "http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/" + this.uploadFile2.originalName;
    }
    if (typeof this.uploadFile3 == 'undefined') {
      var imagenF3 = 'http://pablodececco.com.ar/assets/img/peppy.jpg';
    } else {
      var imagenF3 = "http://buenaaccion.com.ar/UTN/finallab/GJS2/API/uploads/" + this.uploadFile3.originalName;
    }
    /*if (this.img == null)
      this.img = imagenF
    else
      imagenF = this.img

    if (this.img2 == null)
      this.img2 = imagenF2
    else
      imagenF2 = this.img2

    if (this.img3 == null)
      this.img3 = imagenF3
    else
      imagenF3 = this.img3*/

    var array = [{
      "descripcion_corta": this.descripcion_corta, "descripcion_larga": this.descripcion_larga, "precio_costo": this.precio_costo,
      "precio_venta": this.precio_venta, "idprod": this.idprod, "promocion": this.promocion, "imagen": imagenF, "imagen2": imagenF2, "imagen3": imagenF3
    }];
    if (x == 1) {
      this.WebserviceService.ModificarProducto(array).then(data => {
        if (data.ok) {
          this.listarprod();
          //window.location.reload();
        } else {
          alert('error al grabar');
        }
      })
    } else {
      this.WebserviceService.AgregarProducto(array).then(data => {
        if (data.ok) {
          this.listarprod();
          //window.location.reload();
        } else {
          alert('error al grabar');
        }
      })
    }
  }

  confirmar() {

    this.sinPedidos = true;
    if (this.rolId != '4') {

      this.comboClientes();
    } else {
      var array = [{ "token": localStorage.getItem('Token') }];
      this.WebserviceService.PayLoad(array).then(data => {
        this.datosCliente(data.data.idusuario);
      })

    }
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
        this.direction.origin = localStorage.getItem('Posicion');
        this.direction.destination = this.calle + ' ' + this.numero + ', ' + this.localidad;
        setTimeout(() => {
          this.showDirection();
        }, 2000);
      })
    }
  }
  confirmarPedido() {
    var local = localStorage.getItem('Local');

    var data = [{
      "localidad": this.localidad, "calle": this.calle, "numero": this.numero, "piso": this.piso,
      "dpto": this.dpto, "entrecalles": this.entrecalles, "comentarios": this.comentarios, "idusuarioC": this.idusuarioC
      , "local": local, "idusuario": this.usuario
    }];

    this.WebserviceService.NuevoPedido(data, this.pedidos).then(data => {
      if (data.ok) {
        var r = confirm("Pedido Realizado, ¿Desea cargar una encuesta de Satisfacción?");
        if (r == true) {
          this.router.navigate(['Encuesta']);
        } else {

        }
      } else {
        alert('error al grabar');
      }
    })
  }

  validar(que, form) {
    // tslint:disable-next-line:curly
    switch (form) {
      case 1:
        if (this.formPedido.controls[que].valid === false) {
          this.mensajeError = true;
          document.getElementById('error' + que).style.display = 'block';
        } else {
          this.mensajeError = false;
          document.getElementById('error' + que).style.display = 'none';
        }
        break;
      case 2:
        if (this.formProductos.controls[que].valid === false) {
          this.mensajeError = true;
          document.getElementById('error' + que).style.display = 'block';
        } else {
          this.mensajeError = false;
          document.getElementById('error' + que).style.display = 'none';
        }
        break;
    }

  }
  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response ${captchaResponse}:`);
    this.paso = true;
  }

}
