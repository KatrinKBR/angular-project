import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  movieInfo: any
  onDestroy$ = new Subject<any>();
  
  constructor(private jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    this.jsonDataService.getData().pipe(takeUntil(this.onDestroy$))
    .subscribe((data) => (this.movieInfo = data[0]))
  }
}
