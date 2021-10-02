import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseListComponent } from 'src/app/common/components/BaseListComponent';
import { BeerModel } from 'src/app/common/models/BeerModel';
import { Router, ActivatedRoute } from '@angular/router';
import { BeerService } from 'src/app/common/services/beer.service';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseListComponent<BeerModel> implements OnInit, OnDestroy {
  brewedTime: string | null = null;

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
    const beersFilter = {
      page: this.pageIndex,
      per_page: this.pageSize,
      brewed_before: this.brewedTime
    };
    this.beerService.requestList(null, beersFilter).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data.isSuccess()) {
        this.listData = data.getResult();    
      }
    });
  }

  public changePageOptions(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;    
    this.processData();
  }

  public onMoveToItem(item: BeerModel) {
    this.router.navigate([item.id], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
