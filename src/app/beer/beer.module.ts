import { NgModule } from '@angular/core';
import { BeerComponent } from './beer.component';
import { BeerRoutingModule } from './beer-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    BeerComponent,
    ListComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BeerRoutingModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: []
})
export class BeerModule { }
