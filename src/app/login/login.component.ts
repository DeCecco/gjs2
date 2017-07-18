import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebserviceService } from '../servicios/webservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  cuenta='pdececco';
  password='72256';
  datosTraidos;
  formLogin: FormGroup;
  constructor(private WebserviceService : WebserviceService,public formBuilder: FormBuilder) { 
    this.formLogin = formBuilder.group({
      //VALIDACIONES
      cuenta: [this.cuenta, Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern('^[a-zA-Z]+$')])],      
      password: [this.password, Validators.compose([Validators.required, Validators.maxLength(30),Validators.minLength(6)])]      
    });
  }

  ngOnInit() {
  }
  TraerPersonas(){
    this.WebserviceService.TraerPersonas()
      .then(data => {        
        console.info(this.formLogin);
        this.datosTraidos = data;        
        if(this.formLogin.valid){
          console.warn('valido')
        }else{
          console.warn('invalido')
        }
        if(this.cuenta==this.datosTraidos[0].cuenta && this.password==this.datosTraidos[0].password ){
          console.warn('ADENTRO')
        }else{
          console.warn('ERROR')
        }
      }) 
      .catch(error => {
        console.log(error);
      });
  }
  Login(){
     var array = [{"cuenta": this.cuenta,"password": this.password}];
    this.WebserviceService.Login(array).then(data=>{
      console.info(data)
      if(data>0){
        console
      }

    })
  }
}
