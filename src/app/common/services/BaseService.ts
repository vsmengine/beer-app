import { HttpClient, HttpParams, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http'
import { environment } from './../../../environments/environment'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseHandler } from '../handlers/ResponseHandler';

export abstract class BaseService {
    private readonly BASE_PATH: string = environment.BASE_URL;
    private dafaultHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    };

    constructor(
        public httpClient: HttpClient,
        public endPointString: string
    ) {

    }

    private getParams(option: any): HttpParams {
        if (option && option instanceof HttpParams) {
            return option;
        } else if (option) {
            return this.buildParams(option);
        } else {
            return;
        }
    }
    
    private buildParams(option: {string: any}): HttpParams {
        return Object.entries(option).reduce((httpParams, key) => {
            return key[1] == null || key[1] === '' ?
                httpParams :
                httpParams.append(key[0], key[1]);
        }, new HttpParams());
    }

    private getHeaders(option: any): HttpHeaders {
        if (option && option instanceof HttpHeaders) {
            return option;
        } else if (option) {
            return new HttpHeaders(option);
        } else {
            return;
        }
    }

    private getOptions(options: {headers?: any, params?: any, body?: any}): {
        headers?: HttpHeaders | {
            [header: string]: string | string[];
        };
        observe: 'response';
        params?: HttpParams | {
            [param: string]: string | string[];
        };
        reportProgress?: boolean;
        responseType?: 'json';
        withCredentials?: boolean;
        body?: any;
   } {
        return {
            observe: 'response',
            headers: this.getHeaders(options?.headers),
            params: this.getParams(options?.params),
            body: options?.body
        };
    }

    private getRequestUrl(subPath?: string): string {
        const pathArray = [this.BASE_PATH, this.endPointString];
        if (subPath) {
            pathArray.push(subPath);
        }
        return pathArray.join('/');
    }

    private processResponse<T>(response?: Observable<HttpResponse<T>>): Observable<ResponseHandler<T>> {
        let result: any = null;
        let errors: any = null;

        return response.pipe(
            map((response: HttpResponse<T> | HttpErrorResponse) => {                            
                try {
                    if (response) {
                        switch(response.status) {
                            case 200:                            
                            result = (response as HttpResponse<T>).body;
                            case 400:
                            errors = (response as HttpErrorResponse).error
                        }
                        return new ResponseHandler({
                            result: result,
                            errors: errors
                        });
                    }
                } catch (error) {
                    throw(error);
                }
            })
        );
    }

    // Generic get request
    public get<T>(subPath?: string | null, data?: any): Observable<ResponseHandler<T>> {
        return this.processResponse(
            this.httpClient.get<T>(
                this.getRequestUrl(subPath),
                this.getOptions(data)
            )
        )
    }
}
