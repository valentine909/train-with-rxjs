import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SecondPageComponent } from './pages/second-page/second-page.component';
import { RouterModule, Routes } from '@angular/router';
import { ThirdPageComponent } from './pages/third-page/third-page.component';
import { FourthPageComponent } from './pages/fourth-page/fourth-page.component';

const routes: Routes = [
  { path: 'first', component: MainPageComponent },
  {
    path: 'second',
    component: SecondPageComponent,
  },
  {
    path: 'third',
    component: ThirdPageComponent,
  },
  {
    path: 'fourth',
    component: FourthPageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    FourthPageComponent,
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
