import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class BaseComponent {

    protected constructor() {

    }

    public sliceText(text: string, endIndex: number, startIndex: number = 0): string {
        return text.slice(startIndex, endIndex);
    }

}

export abstract class BaseChildComponent extends BaseComponent {
    public ngUnsubscribe = new Subject;
    private routeParams: Params | null  = null;

    protected constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute
    ) {
        super();
        this.processRoute();
    }

    private processRoute() {
        this.activatedRoute.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
            this.routeParams = params;
        });
    }

    public getParamByName(name: string): string {
        return this.routeParams[name];
    }

}
