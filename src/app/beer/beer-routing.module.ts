import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const beerRoutes: Routes = [
  {
    path: '',
    children: [
      {
          path: '',
          pathMatch: 'full',
          component: ListComponent
      },
      {
        path: ':id',
        component: DetailComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(beerRoutes)],
  exports: [RouterModule]
})
export class BeerRoutingModule { }
