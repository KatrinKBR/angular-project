import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  movieData: any = [
    { 
      titulo: "Harry Potter y la piedra filosofal",
      poster: "../../assets/HP1.jpg",
      duracion: 152,
      genero: ["Fantasía", "Aventuras"],
      precio: 3000
    },
    {
      titulo: "Doctor Sueño",
      poster: "../../assets/DS.jpg",
      duracion: 153,
      genero: ["Terror", "Suspenso"],
      precio: 5000
    },
    {
      titulo: "Guardianes de la Galaxia",
      poster: "../../assets/GoG.jpg",
      duracion: 122,
      genero: ["Acción", "Ciencia ficción", "Superhéroes"],
      precio: 6000
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
