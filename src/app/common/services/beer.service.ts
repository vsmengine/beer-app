import { Injectable } from '@angular/core';
import { BaseListService } from './BaseListService';
import { BaseModel } from '../models/BaseModel';
import { BeerModel } from '../models/BeerModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BeerService extends BaseListService<BeerModel> {

  constructor(
    public httpClient: HttpClient
  ) {
    super(
      httpClient,
      'beers'
    );
  }

}
