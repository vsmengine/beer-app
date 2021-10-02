import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseListComponent } from 'src/app/common/components/BaseListComponent';
import { BeerModel } from 'src/app/common/models/BeerModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseListComponent<BeerModel> implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    super(
      router,
      activatedRoute
    );
  }

  ngOnInit(): void {
    console.log('list');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
