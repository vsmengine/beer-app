import { BaseChildComponent } from './BaseComponent';
import { BaseModel } from '../models/BaseModel';
import { Router, ActivatedRoute } from '@angular/router';

export abstract class BaseListComponent<T extends BaseModel> extends BaseChildComponent {

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
