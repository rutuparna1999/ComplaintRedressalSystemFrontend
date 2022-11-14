import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserMaster } from '../models/user-master.model';

const baseUrl= 'http://localhost:8081/api/Users';
const baseUrlengineer = 'http://localhost:8081/api/Engineers';
@Injectable({
  providedIn: 'root'
})
export class UsermanageService {

  constructor(private http: HttpClient) { }
  
  createUser(data: any): Observable<any> {
   // console.log("hii create data"+data);
    return this.http.post(baseUrl, data);
  }
  getAllusers(): Observable<UserMaster[]> {
    return this.http.get<UserMaster[]>(baseUrl);
  }
  selectUserByid(id: any): Observable<UserMaster> {
   // console.log("select by id"+id);
    return this.http.get(`${baseUrl}/${id}`);
  }
  updateUserByid(id: any,data:any): Observable<UserMaster> {
   // console.log("select by id"+id+"update by data"+data.usertype.utid);
    return this.http.put(`${baseUrl}/${id}`,data);
  }
  deleteUserByid(id: any): Observable<UserMaster> {
   // console.log("delete by id"+id);
    return this.http.delete(`${baseUrl}/${id}`);
  }
  getAllEngineers(pincode:any): Observable<UserMaster[]> {
   // console.log(pincode);
    return this.http.get<UserMaster[]>(`${baseUrlengineer}/${pincode}`);
  }
}
