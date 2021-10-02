import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseListComponent } from 'src/app/common/components/BaseListComponent';
import { BeerModel } from 'src/app/common/models/BeerModel';
import { Router, ActivatedRoute } from '@angular/router';
import { BeerService } from 'src/app/common/services/beer.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseListComponent<BeerModel> implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private beerService: BeerService
  ) {
    super(
      router,
      activatedRoute
    );
  }

  ngOnInit(): void {
    console.log('list');
    this.processData();
  }

  private processData() {
    /*const beersFilter = {
      page: this.pageIndex,
      per_page: this.pageSize,
      brewed_before: this.brewedTime
    };*/
    this.beerService.requestList().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data.isSuccess()) {
        this.listData = data.getResult();    
      }
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
