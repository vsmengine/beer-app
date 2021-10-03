import { NgModule } from '@angular/core';
import { BeerComponent } from './beer.component';
import { BeerRoutingModule } from './beer-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import {MatInputModule} from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { TextTruncatePipe } from '../common/pipes/text-truncate.pipe';

@NgModule({
  declarations: [
    BeerComponent,
    ListComponent,
    DetailComponent,
    TextTruncatePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    BeerRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    IvyCarouselModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: []
})
export class BeerModule { }
