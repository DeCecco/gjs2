import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.component.html',
  styleUrls: ['./acercade.component.css']
})
export class AcercadeComponent implements OnInit {  
  position:string;
  @Input() posicion:string;
  constructor() { 
    
    this.position=localStorage.getItem('Posicion');
  }

  ngOnInit() {
  }

}
