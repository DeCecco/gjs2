import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebserviceService {

  route: string = "http://localhost/UTN/GJS2/API/index.php/";
  constructor(private http: Http) { }

  TraerPersonas() {
    return this.http.get(this.route + "persona/obtenerTodas").toPromise().then(data => data.json());
  }
  ListarProductos() {
    return this.http.get(this.route + "productos/listar").toPromise().then(data => data.json());
  }
  Eliminar(id,clase) {
    var data = { "id": id }
    return this.http.post(this.route +clase, data).toPromise().then(data => data.json());
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
}
