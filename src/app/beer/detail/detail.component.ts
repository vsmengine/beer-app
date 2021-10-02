import { Component, OnInit } from '@angular/core';
import { BaseChildComponent } from 'src/app/common/components/BaseComponent';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent extends BaseChildComponent implements OnInit {

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
    console.log('detail');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
