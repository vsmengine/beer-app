import { Injectable } from '@angular/core';
import { BaseModel } from '../models/BaseModel';
import { BaseService } from './BaseService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseHandler } from '../handlers/ResponseHandler';

export abstract class BaseListService<T extends BaseModel> extends BaseService {
  
    constructor(
        public httpClient: HttpClient,
        public endPointString: string
    ) {
        super(
            httpClient,
            endPointString
        );
    }

    public requestList(subPath?: string, dataFilter?: any): Observable<ResponseHandler<T>> {
        const data = {
            params: dataFilter
        };        
        return this.get<T>(null, data);
    }

    public requestItem(subPath?: string, dataFilter?: any): Observable<ResponseHandler<T>> {
        const data = null;
        return this.get<T>(subPath, data);
    }
    
}