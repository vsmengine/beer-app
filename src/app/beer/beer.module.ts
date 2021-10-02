import { NgModule } from '@angular/core';
import { BeerComponent } from './beer.component';
import { BeerRoutingModule } from './beer-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    BeerComponent,
    ListComponent,
    DetailComponent,
  ],
  imports: [
    BeerRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class BeerModule { }
