import { BaseChildComponent } from './BaseComponent';
import { BaseModel } from '../models/BaseModel';
import { Router, ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

export abstract class BaseListComponent<T extends BaseModel> extends BaseChildComponent {
    public listData: T[] | null = [];
    pageEvent: PageEvent = new PageEvent();    
    listLength: number = 500;
    pageIndex: number = 1;
    pageSize: number = 10;

    protected constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) {
        super(
            router,
            activatedRoute
        );
    }

}
