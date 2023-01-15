import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { EvaluateRequest } from "../models/EvaluateRequest";


@Injectable({
  providedIn: 'root'
})
export class FeatureflagService {  

  constructor(private _http: HttpClient) { }

  public evaluate(evaluateRequest: EvaluateRequest) {
    return this._http.post(`${baseUrl}/flipt/evaluate/`, evaluateRequest)
  }
}
