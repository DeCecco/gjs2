import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebserviceService } from '../servicios/webservice.service';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {
  lista: any;
  descripcion: string;
  localidad: string;
  calle: string;
  numero: number;
  id: number;
  formLocales: FormGroup;
  disa:boolean;
  constructor(private WebserviceService: WebserviceService, public formBuilder: FormBuilder) {
    this.disa=false;
    this.formLocales = formBuilder.group({
      //VALIDACIONES
      descripcion: [this.descripcion, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z 0-9]+$')])],
      localidad: [this.localidad, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z 0-9]+$')])],
      calle: [this.calle, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z 0-9]+$')])],
      numero: [this.numero, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[0-9]+$')])],
    });
  }

  ngOnInit() {
    this.WebserviceService.ListarLocales().then(data => {
      console.info(data)
      this.lista = data;

    })
  }
  modificar(x) {
    this.descripcion = x.descripcion;
    this.localidad = x.localidad;
    this.calle = x.calle;
    this.numero = x.numero;
    this.id = x.idlocal
    this.disa=false;
  }
  update(x) {
    var array = [{
      "descripcion": this.descripcion, "localidad": this.localidad, "calle": this.calle,
      "numero": this.numero, "idlocal": this.id
    }];
    if (x == 1) {
      this.WebserviceService.ModificarLocal(array).then(data => {
        if (data.ok) {
          window.location.reload();
        } else {
          alert('error al grabar');
        }
      })
    } else {

    }
  }
  alta() {
    this.descripcion='';
    this.localidad='';
    this.calle='';
    this.numero;    
    this.disa=true;
  }
}