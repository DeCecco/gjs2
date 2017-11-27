import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebserviceService } from '../servicios/webservice.service';
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  preguntas: any;
  respuestas: any;
  respondidas: string[]
  public loading = false;
  /*datapreguntas = {};
  preguntas = [];*/
  constructor(private WebserviceService: WebserviceService, public formBuilder: FormBuilder, private router: Router) {
    this.loading = true;
   }

  ngOnInit() {
    this.WebserviceService.ListadoPreguntas().then(data => {
      // tslint:disable-next-line:no-console
      this.preguntas = data;
      console.info(this.preguntas)
      /*let inicio = this.lista[0].idpreg;
      console.info(this.preguntas)
      this.datapreguntas['id'] = this.lista[0].idpreg;
      this.datapreguntas['pregunta'] = this.lista[0].pregunta;
      //this.preguntas.push(this.datapreguntas);
      console.info(this.datapreguntas);
      console.info(this.preguntas);
      this.lista.forEach(element => {
        if (inicio != element.idpreg) {
          inicio = element.idpreg;
          this.datapreguntas['id'] = inicio;
          this.datapreguntas['pregunta'] = element.pregunta;
          this.preguntas.push(this.datapreguntas);
        }
      });*/
      //console.info(preguntas2)


    })
    this.WebserviceService.ListadoRespuestas().then(data => {
      this.respuestas = data;
      this.loading = false;
      console.info(this.respuestas)
    })
  }
  trackByIndex(index: number, value: number) {
    return index;
  }
  agregar(P,R){
    console.info(P);
    console.info(R);
  }
  encuestaF(P){
    console.info(P)
  }

}
