import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { countdown } from './model';
import {
  EMPTY,
  fromEvent,
  interval,
  map,
  merge,
  switchMap,
  takeWhile,
} from 'rxjs';

@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.component.html',
  styleUrls: ['./third-page.component.css'],
})
export class ThirdPageComponent implements AfterViewInit {
  @ViewChild('start') startBtn!: ElementRef<HTMLButtonElement>;
  @ViewChild('pause') pauseBtn!: ElementRef<HTMLButtonElement>;

  countdown: number = countdown;

  constructor() {}

  ngAfterViewInit(): void {
    const startClick$ = fromEvent(this.startBtn.nativeElement, 'click');
    const pauseClick$ = fromEvent(this.pauseBtn.nativeElement, 'click');
    const countdown$ = interval(1000).pipe(
      takeWhile(() => this.countdown > 0),
      map(() => this.countdown--)
    );

    merge(startClick$.pipe(map(() => true)), pauseClick$.pipe(map(() => false)))
      .pipe(
        switchMap((shouldCount) => {
          return shouldCount ? countdown$ : EMPTY;
        })
      )
      .subscribe();
  }
}
