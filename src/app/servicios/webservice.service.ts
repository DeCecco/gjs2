import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebserviceService {

  route: string = "http://localhost/UTN/GJS2/API/index.php/";
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
  /*----------------------------------FIN  COMUN A TODOS--------------------------------*/
  /*----------------------------------INICIO PERSONAS--------------------------------*/
  TraerPersonas() {
    return this.http.get(this.route + "persona/obtenerTodas").toPromise().then(data => data.json());
  }
  AgregarPersona(formData) {
    var body = {
      "email": formData[0].email,
      "rol": formData[0].rol,
      "nombre": formData[0].nombre,
      "apellido": formData[0].apellido,
      "dni": formData[0].dni,
      "cuenta": formData[0].cuenta
    }
    return this.http.post(this.route + "persona/agregar", body).toPromise();
  }
  ModificarPersona(formData) {
    var body = {
      "email": formData[0].email,
      "rol": formData[0].rol,
      "password": formData[0].password,
      "nombre": formData[0].nombre,
      "apellido": formData[0].apellido,
      "dni": formData[0].dni,
      "legajo": formData[0].legajo,
      "id": formData[0].id,
      "img": formData[0].img,
    }
    return this.http.post(this.route + "persona/modificar", body).toPromise();
  }
  /*----------------------------------FIN PERSONAS--------------------------------*/
  /*----------------------------------INICIO PRODUCTOS--------------------------------*/
  ListarProductos() {
    return this.http.get(this.route + "productos/listar").toPromise().then(data => data.json());
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
  /*----------------------------------FIN PRODUCTOS--------------------------------*/
  /*----------------------------------INICIO LOCALES--------------------------------*/
  ListarLocales() {
    return this.http.get(this.route + "locales/listar").toPromise().then(data => data.json());
  }
  TraerLocal(form) {
    var data = { "local": form[0].local }
    return this.http.post(this.route + "persona/traerlocal", data).toPromise().then(data => data.json());
  }
  /*----------------------------------FIN LOCALES--------------------------------*/

  Eliminar(id, clase) {
    var data = { "id": id }
    return this.http.post(this.route + clase, data).toPromise().then(data => data.json());
  }


}
