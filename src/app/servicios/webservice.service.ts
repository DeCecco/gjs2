import { Injectable } from '@angular/core';
import { Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebserviceService {

  route : string = "http://localhost/UTN/GJS2/API/index.php/";
  constructor(private http : Http) { }

  TraerPersonas(){
    return this.http.get(this.route + "persona/obtenerTodas").toPromise().then(data => data.json());
  }

}
