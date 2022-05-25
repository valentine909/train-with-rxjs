import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { combineLatestWith, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'app-sixth-page',
  templateUrl: './sixth-page.component.html',
  styleUrls: ['./sixth-page.component.css'],
})
export class SixthPageComponent implements AfterViewInit {
  payment: string = '';
  @ViewChild('loan') loan!: ElementRef<HTMLInputElement>;
  @ViewChild('interest') interest!: ElementRef<HTMLInputElement>;
  @ViewChildren('time', { read: ElementRef })
  time!: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit(): void {
    const loan$ = this.createInputSteam(this.loan.nativeElement);
    const interest$ = this.createInputSteam(this.interest.nativeElement);
    const time$ = this.createInputSteam(
      this.time.toArray().map((x) => x.nativeElement)
    );
    loan$
      .pipe(
        combineLatestWith(interest$, time$),
        map(([loan, interest, time]) => {
          return this.calculatePayment(loan, interest, time);
        }),
        tap((result: number) => (this.payment = result.toString()))
      )
      .subscribe();
  }

  calculatePayment(loan: number, interest: number, years: number): number {
    const n = 12;
    const N = n * years;
    const R = (interest * 0.01) / n;
    return (loan * R * (1 + R) ** N) / ((1 + R) ** N - 1);
  }

  createInputSteam(elem: HTMLElement | HTMLElement[]) {
    return fromEvent(elem, 'input').pipe(
      map((event: Event) => {
        return parseFloat((event.target as HTMLInputElement).value);
      }),
      filter((value) => !isNaN(value))
    );
  }
}
