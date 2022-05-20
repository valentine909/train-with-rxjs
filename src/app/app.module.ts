import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { SecondPageComponent } from './pages/second-page/second-page.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'first', component: MainPageComponent },
  {
    path: 'second',
    component: SecondPageComponent,
  },
];

@NgModule({
  declarations: [AppComponent, MainPageComponent, SecondPageComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
