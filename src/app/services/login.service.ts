import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
const baseUrl = 'http://localhost:8081/api/logintest';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  logintomyaccount(email: any,password:any): Observable<Login> {
   // console.log("LOGINWITH email="+email+"password is="+password);
    return this.http.get(`${baseUrl}/${email}/${password}`);
  }
}
