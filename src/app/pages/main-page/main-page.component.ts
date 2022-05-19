import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements AfterViewInit {
  @ViewChild('container') container!: ElementRef<HTMLDivElement>;
  @ViewChild('search') search!: ElementRef<HTMLInputElement>;

  url: string = 'https://api.openbrewerydb.org/breweries/search?';

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    const response$ = fromEvent(this.search.nativeElement, 'keyup').pipe(
      debounceTime(1000),
      map(() => this.search.nativeElement.value),
      filter((key: string) => key.length >= 3),
      map((key: string) => {
        return new HttpParams().set('query', key);
      }),
      switchMap<HttpParams, Observable<IBrew[]>>((params) =>
        this.http.get<IBrew[]>(this.url, { params: params })
      )
    );
    response$.subscribe(
      (data: IBrew[]) =>
        (this.container.nativeElement.innerHTML = data
          .map((brew) => brew.name)
          .join('<br>'))
    );
  }
}

interface IBrew {
  name: string;
}
