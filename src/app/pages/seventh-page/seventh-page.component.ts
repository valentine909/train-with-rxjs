import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-seventh-page',
  templateUrl: './seventh-page.component.html',
  styleUrls: ['./seventh-page.component.css'],
})
export class SeventhPageComponent implements AfterViewInit {
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit(): void {
    const subject$ = new Subject();
    const loadingService = {
      showLoading: () => subject$.next(true),
      hideLoading: () => subject$.next(false),
      loadingStatus$: () => subject$.asObservable(),
    };
    loadingService.loadingStatus$().subscribe((isLoading) => {
      return isLoading
        ? this.overlay.nativeElement.classList.remove('hide')
        : this.overlay.nativeElement.classList.add('hide');
    });
    loadingService.showLoading();
    setTimeout(() => loadingService.hideLoading(), 3000);
  }
}
