import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  movieData: any = []
  onDestroy$ = new Subject<any>();

  constructor(private jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    this.jsonDataService.getData().pipe(takeUntil(this.onDestroy$))
    .subscribe((data) => (this.movieData = data))
  }

}
