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
      password: [this.password, Validators.compose([Validators.required, Validators.maxLength(30),Validators.minLength(5)])]      
    });
  }

  ngOnInit() {
  }
  Login(){
     var array = [{"cuenta": this.cuenta,"password": this.password}];
     if(this.formLogin.valid){
         
        this.WebserviceService.Login(array).then(data=>{          
          if(data.length>0){                       
             var array = [{"nombre": data[0].nombre,"apellido":data[0].apellido,"cuenta":data[0].cuenta,"mail":data[0].mail,"dni":data[0].dni,
             "idrol":data[0].idrol,"idusuario":data[0].idusuario }]; 
            this.WebserviceService.CrearToken(array).then(data=>{
              console.warn(data)
              localStorage.setItem('Token', data);              
              //set localStorage.setItem('Token', data);      
              //get console.info(localStorage.getItem('Token'));
              //remove localStorage.removeItem('Token');
       
              
              
              
              
              
            })
          }else{
            console.info('datos invalidos')
          }

        })
     }else{
        console.warn('invalido')
     }
  }
  tk(){
            
            var tk=localStorage.getItem('Token')
            var array = [{"token":tk}];
    this.WebserviceService.VerificarToken(array).then(data=>{                
                if(data){
                  console.info('puede Continuar')
                }else{
                  console.info('TOKEN vencido')
                }
              })
  }
}
