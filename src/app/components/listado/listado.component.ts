import { Component, OnInit } from '@angular/core';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  movieData: any = []

  constructor(private jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    this.jsonDataService.getData().subscribe((data) => (this.movieData = data))
  }

}
