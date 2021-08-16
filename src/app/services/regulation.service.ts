import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Regulation } from '../models/regulation.model';


@Injectable({
  providedIn: 'root'
})
export class RegulationService {
  baseUrl = 'https://github.com/kkondrat98/table/tree/master/src/app/db.json';
  constructor(private http: HttpClient) { }

  addRegulation(regulation: Regulation): Observable<any> {
    return this.http.post(this.baseUrl + '/regulations', regulation);
  }
  updateRegulation(id: number, regulation: Regulation): Observable<any> {
    return this.http.put(this.baseUrl + '/regulations/' + id, regulation);
  }
  getRegulations(): Observable<Regulation[]> {
    return this.http.get<Regulation[]>(this.baseUrl + '/regulations');
  }
  getRegulation(id: number): Observable<Regulation> {
    return this.http.get<Regulation>(this.baseUrl + '/regulations/' + id);
  }
  deleteRegulation(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/regulations/' + id);
  }

}
