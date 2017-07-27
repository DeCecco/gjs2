import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebserviceService {

  route: string = "http://buenaaccion.com.ar/UTN/finallab/GJS2/API/index.php/";
  constructor(private http: Http) { }
  /*----------------------------------INICIO  COMUN A TODOS--------------------------------*/
  Login(array) {
    var data = {
      'cuenta': array[0].cuenta,
      'password': array[0].password
    }
    return this.http.post(this.route + "persona/login", data).toPromise().then(data => data.json());
  }
  CrearToken(form) {
    var data = {
      "nombre": form[0].nombre,
      "apellido": form[0].apellido,
      "dni": form[0].dni,
      "cuenta": form[0].cuenta,
      "idusuario": form[0].idusuario,
      "mail": form[0].mail,
      "idrol": form[0].idrol
    }
    return this.http.post(this.route + "crearToken", data).toPromise().then(data => data.json());
  }
  VerificarToken(form) {
    var data = {
      "token": form[0].token
    }

    return this.http.post(this.route + "verificarToken", data).toPromise().then(data => data.json());
  }
  PayLoad(form) {
    var data = {
      "token": form[0].token
    }
    return this.http.post(this.route + "payLoad", data).toPromise().then(data => data.json());
  }
  datosCliente(form) {
    var data = {     "idusuario": form[0].idusuario    }    
    return this.http.post(this.route + "datosclientes", data).toPromise().then(data => data.json());
  }
  cmbClientes() {
    return this.http.get(this.route + "clientes/listar").toPromise().then(data => data.json());
  }
  ListadoPedidos(form) {
    var data = {
      "idusuario": form[0].idusuario,
      "idrol": form[0].idrol
    }
    return this.http.post(this.route + "pedidos", data).toPromise().then(data => data.json());
  }
  CambiarEstadoPedido(form) {
    var data = {
      "idpedido": form[0].idpedido,
      "estado": form[0].estado
    }
    return this.http.post(this.route + "pedidos/estado", data).toPromise().then(data => data.json());
  }  
  /*----------------------------------FIN  COMUN A TODOS--------------------------------*/
  /*----------------------------------INICIO PERSONAS--------------------------------*/
  TraerPersonas(form) {
    var body = {
      "idrol": form[0].idrol
    }
    
    return this.http.get(this.route + "persona/obtenerTodas",body).toPromise().then(data => data.json());
  }
  AgregarPersona(formData) {
    var body = {
      "email": formData[0].email,
      "rol": formData[0].rol,
      "nombre": formData[0].nombre,
      "apellido": formData[0].apellido,
      "dni": formData[0].dni,
      "cuenta": formData[0].cuenta,
      "ciudad": formData[0].ciudad,
      "localidad": formData[0].localidad,
      "calle": formData[0].calle,
      "numero": formData[0].numero,
      "piso": formData[0].piso,
      "dpto": formData[0].dpto,
      "tel": formData[0].tel,
      "entrecalles": formData[0].entrecalles,
    }
    console.info(body)
    return this.http.post(this.route + "persona/agregar", body).toPromise();
  }
  ModificarPersona(formData) {
    var body = {
      "email": formData[0].email,
      "rol": formData[0].rol,
      "nombre": formData[0].nombre,
      "apellido": formData[0].apellido,
      "dni": formData[0].dni,
      "cuenta": formData[0].cuenta,
      "ciudad": formData[0].ciudad,
      "localidad": formData[0].localidad,
      "calle": formData[0].calle,
      "numero": formData[0].numero,
      "piso": formData[0].piso,
      "dpto": formData[0].dpto,
      "tel": formData[0].tel,
      "entrecalles": formData[0].entrecalles,
      "idusuario": formData[0].idusuario,
    }    
    return this.http.post(this.route + "persona/modificar", body).toPromise();
  }
  /*----------------------------------FIN PERSONAS--------------------------------*/
  /*----------------------------------INICIO PRODUCTOS--------------------------------*/
  ListarProductos() {
    return this.http.get(this.route + "productos/listar").toPromise().then(data => data.json());
  }
  AgregarProducto(formData) {
    var body = {
      "descripcion_larga": formData[0].descripcion_larga,
      "descripcion_corta": formData[0].descripcion_corta,
      "precio_costo": formData[0].precio_costo,
      "precio_venta": formData[0].precio_venta,
      "promocion": formData[0].promocion
    }
    
    return this.http.post(this.route + "producto/agregar", body).toPromise();
  }
  ModificarProducto(formData) {
    var body = {
      "descripcion_larga": formData[0].descripcion_larga,
      "descripcion_corta": formData[0].descripcion_corta,
      "precio_costo": formData[0].precio_costo,
      "precio_venta": formData[0].precio_venta,
      "promocion": formData[0].promocion,
      "idprod": formData[0].idprod
    }
    console.info(body)
    return this.http.post(this.route + "producto/modificar", body).toPromise();
  }
  EliminarProducto(formData) {
    var body = {
      "idprod": formData[0].idprod
    }
    console.info(body)
    return this.http.post(this.route + "producto/eliminar", body).toPromise();
  }
  NuevoPedido(datoCliente,datoPedido) {
    var body = {
      "localidad": datoCliente[0].localidad,
      "calle": datoCliente[0].calle,
      "numero": datoCliente[0].numero,
      "piso": datoCliente[0].piso,
      "dpto": datoCliente[0].dpto,
      "entrecalles": datoCliente[0].entrecalles,
      "comentarios": datoCliente[0].comentarios,
      "idusuarioC": datoCliente[0].idusuarioC,      
      "local": datoCliente[0].local,
      "idusuario": datoCliente[0].idusuario,
      "pedidos":datoPedido
    }
    
    return this.http.post(this.route + "pedido/nuevo", body).toPromise();
  }
  /*----------------------------------FIN PRODUCTOS--------------------------------*/
  /*----------------------------------INICIO LOCALES--------------------------------*/
  ListarLocales() {
    return this.http.get(this.route + "locales/listar").toPromise().then(data => data.json());
  }
  TraerLocal(form) {
    var data = { "local": form[0].local }
    return this.http.post(this.route + "persona/traerlocal", data).toPromise().then(data => data.json());
  }
  AgregarLocal(formData) {
    var body = {
      "descripcion": formData[0].descripcion,
      "localidad": formData[0].localidad,
      "calle": formData[0].calle,
      "numero": formData[0].numero
    }
    return this.http.post(this.route + "local/agregar", body).toPromise();
  }
  ModificarLocal(formData) {
    var body = {
      "descripcion": formData[0].descripcion,
      "localidad": formData[0].localidad,
      "calle": formData[0].calle,
      "numero": formData[0].numero,
      "idlocal": formData[0].idlocal
    }
    return this.http.post(this.route + "local/modificar", body).toPromise();
  }
  EliminarLocal(formData) {
    var data = { "idlocal": formData[0].idlocal }
    return this.http.post(this.route +"local/eliminar", data).toPromise().then(data => data.json());
  }  
  /*----------------------------------FIN LOCALES--------------------------------*/

  Eliminar(id, clase) {
    var data = { "id": id }
    return this.http.post(this.route + clase, data).toPromise().then(data => data.json());
  }
  /*----------------------------------INICIO LOCALES--------------------------------*/
  VentasPorLocal() {
    return this.http.get(this.route + "/estadisticas/ventasporlocal").toPromise().then(data => data.json());
  }
    
  /*----------------------------------FIN LOCALES--------------------------------*/


}
