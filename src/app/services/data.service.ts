import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Users } from '../models/users';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) { }

  addUser(user: Users): Observable<any> {
    return this.http.post(this.baseUrl + '/users', user);
  }
  updateUser(id: number, user: Users): Observable<any> {
    return this.http.put(this.baseUrl + '/users/' + id, user);
  }
  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.baseUrl + '/users');
  }
  getUser(id: number): Observable<Users> {
    return this.http.get<Users>(this.baseUrl + '/users/' + id);
  }
  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/users/' + id);
  }

}
