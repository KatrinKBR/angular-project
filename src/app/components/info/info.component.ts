import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { JsonDataService } from 'src/app/services/json-data.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  movieInfo: any;
  onDestroy$ = new Subject<any>();
  
  constructor(private route: ActivatedRoute, private jsonDataService: JsonDataService) { }

  ngOnInit(): void {
    let movieId = this.route.snapshot.params['id'] - 1;

    this.jsonDataService.getData().pipe(takeUntil(this.onDestroy$))
    .subscribe((data) => (this.movieInfo = data[movieId]))
  }
}
