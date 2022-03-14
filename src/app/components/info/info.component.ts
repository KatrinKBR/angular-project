import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  movieInfo: any = { 
    titulo: "Harry Potter y la piedra filosofal",
    poster: "../../assets/HP1.jpg",
    director: "Chris Columbus", 
    anio: 2001, 
    duracion: 152,
    genero: ["Fantasía", "Aventuras"],
    audio: "Inglés",
    subtitulos: "Español",
    precio: 3000
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
