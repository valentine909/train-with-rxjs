import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import {
  exhaustMap,
  finalize,
  fromEvent,
  Observable,
  repeat,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.css'],
})
export class SecondPageComponent implements AfterViewInit {
  @ViewChild('startBtn') startBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('stopBtn') stopBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('image') image!: ElementRef<HTMLImageElement>;
  status: string = 'Stopped';

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    const stop$ = fromEvent(this.stopBtn.nativeElement, 'click');
    fromEvent(this.startBtn.nativeElement, 'click')
      .pipe(
        tap<Event>(() => (this.status = 'Active')),
        exhaustMap<Event, Observable<number>>(() => timer(0, 5000)),
        switchMap<number, Observable<dogResponse>>(() =>
          this.http.get<dogResponse>('https://random.dog/woof.json')
        ),
        takeUntil<dogResponse>(stop$),
        finalize<dogResponse>(() => (this.status = 'Stopped')),
        repeat()
      )
      .subscribe(
        (response: dogResponse) => (this.image.nativeElement.src = response.url)
      );
  }
}

export interface dogResponse {
  fileSizeBytes: number;
  url: string;
}
