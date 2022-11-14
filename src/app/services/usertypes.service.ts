import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserTypeMaster } from '../models/user-type-master.model';
const baseUrl= 'http://localhost:8081/api/Usertypes';
@Injectable({
  providedIn: 'root'
})
export class UsertypesService {

  constructor(private http: HttpClient) { }
  getAllusertypes(): Observable<UserTypeMaster[]> {
    return this.http.get<UserTypeMaster[]>(baseUrl);
  }
}
