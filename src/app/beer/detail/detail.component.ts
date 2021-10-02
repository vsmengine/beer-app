import { Component, OnInit } from '@angular/core';
import { BaseChildComponent } from 'src/app/common/components/BaseComponent';
import { Router, ActivatedRoute } from '@angular/router';
import { BeerService } from 'src/app/common/services/beer.service';
import { takeUntil } from 'rxjs/operators';
import { BeerModel } from 'src/app/common/models/BeerModel';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseChildComponent implements OnInit {
  public itemId: string | null = '';
  public itemData: BeerModel | null = null;

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
    this.itemId = this.getParamByName('id');
    this.processData();
  }

  private processData() {
    this.beerService.requestItem(this.itemId, null).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if (data.isSuccess()) {
        this.itemData = data.getResult()[0];        
      }
    });
  }


  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
