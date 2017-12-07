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
  preg1 : string;
  preg2 : string;
  preg3 : string;
  preg4 : string;
  preg5 : string;
  preg6 : string;
  resp1 : string;
  resp2 : string;
  resp3 : string;
  resp4 : string;
  resp5 : string;
  resp6 : string;
  resp7 : string;
  resp8 : string;
  resp9 : string;
  resp10 : string;
  resp61 : boolean;
  resp62 : boolean;
  resp63 : boolean;
  resp64 : boolean;
  respondidas: string[]
  public loading = false;
  datapreguntas = {};
  formEncuestas: FormGroup;
  /*preguntas = [];*/
  constructor(private WebserviceService: WebserviceService, public formBuilder: FormBuilder, private router: Router) {    
    this.loading = true;
    this.formEncuestas = formBuilder.group({
      // VALIDACIONES
      // tslint:disable-next-line:max-line-length
      respuesta: [this.datapreguntas[0]],
      resp1 : [this.resp1, Validators.compose([Validators.required,])],
      resp2 : [this.resp2, Validators.compose([Validators.required,])],
      resp3 : [this.resp3, Validators.compose([Validators.required,])],
      resp4 : [this.resp4, Validators.compose([Validators.required,])],
      resp5 : [this.resp5, Validators.compose([Validators.required,])],
      resp6 : [this.resp6, Validators.compose([Validators.required,])],
      resp7 : [this.resp7, Validators.compose([Validators.required,])],
      resp8 : [this.resp8, Validators.compose([Validators.required,])],
      resp9 : [this.resp9, Validators.compose([Validators.required,])],
      resp10 : [this.resp10, Validators.compose([Validators.required,])],
      resp61 : [this.resp61],
      resp62 : [this.resp62],
      resp63 : [this.resp63],
      resp64 : [this.resp64],

    });    
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
      console.info(data)
      this.respuestas = data;
      this.loading = false;
      
    })
  }
  trackByIndex(index: number, value: number) {
    return index;
  }
  agregar(P, R) {
    console.info(P);
    console.info(R);
  }
  encuestaF() {
    let array = [{
      "pregunta1": this.resp1, "pregunta2": this.resp2, "pregunta3": this.resp3,"pregunta4": this.resp4,"pregunta5": this.resp5,"pregunta6": this.resp6,
      "pregunta7": this.resp7,"pregunta8": this.resp8,"pregunta9": this.resp9,"pregunta10": this.resp10,
    }];
    console.info(array)
    this.WebserviceService.InsertarEncuestas(array).then(data => {
      if (data.ok) {        
        alert('Gracias por cargar la encuesta!!');
        this.router.navigate(['Productos']);
      } else {
        alert('error al grabar');
      }
    })
  }

}
