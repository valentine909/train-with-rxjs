import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { combineLatestWith, filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-fourth-page',
  templateUrl: './fourth-page.component.html',
  styleUrls: ['./fourth-page.component.css'],
})
export class FourthPageComponent implements AfterViewInit {
  result: number = 0;
  @ViewChild('first') first!: ElementRef<HTMLInputElement>;
  @ViewChild('second') second!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    this.streamFromElement(this.first.nativeElement)
      .pipe(
        combineLatestWith(this.streamFromElement(this.second.nativeElement)),
        map(([one, two]) => {
          this.result = one + two;
        })
      )
      .subscribe();
  }

  streamFromElement(elem: HTMLElement) {
    return fromEvent<KeyboardEvent>(elem, 'input').pipe(
      map((event: KeyboardEvent) => {
        return (event.target as HTMLInputElement).valueAsNumber;
      }),
      filter((value) => !isNaN(value))
    );
  }
}
