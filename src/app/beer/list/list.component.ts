import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BaseListComponent } from 'src/app/common/components/BaseListComponent';
import { BeerModel } from 'src/app/common/models/BeerModel';
import { Router, ActivatedRoute } from '@angular/router';
import { BeerService } from 'src/app/common/services/beer.service';
import { takeUntil } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { FormControl } from '@angular/forms';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
  ]
})
export class ListComponent extends BaseListComponent<BeerModel> implements OnInit, OnDestroy {
  searchString: string = '';
  timeSelection: FormControl = new FormControl(moment());
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

  public onSearchItem() {
    const beersFilter = {
      page: this.pageIndex,
      per_page: this.pageSize,
      beer_name: this.searchString.split(' ').join('_')
    };
    this.beerService.requestList(null, beersFilter).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data.isSuccess()) {
        this.listData = data.getResult();    
      }
    });
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.timeSelection.value;
    ctrlValue.year(normalizedYear.year());
    this.timeSelection.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.timeSelection.value;
    ctrlValue.month(normalizedMonth.month());
    this.timeSelection.setValue(ctrlValue);
    this.brewedTime = normalizedMonth.format('MM-YYYY').toString();
    this.processData();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
