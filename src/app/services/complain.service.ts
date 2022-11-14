import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complain } from '../models/complain.model';
import { Complainstatus } from '../models/complainstatus.model';
const baseUrl= 'http://localhost:8081/api/Complains';
const baseUrlstatus= 'http://localhost:8081/api/Status';
const baseUrlCostomer= 'http://localhost:8081/api/ComplainsWithStatusByUid';
const baseUrlAll= 'http://localhost:8081/api/ComplainsWithStatus';
const baseUrlEpending= 'http://localhost:8081/api/Engineerspending';
const baseUrlEresolved= 'http://localhost:8081/api/EngineerResolved';
const baseUrlmycomplains = 'http://localhost:8081/api/mycomplains';
@Injectable({
  providedIn: 'root'
})
export class ComplainService {

  constructor(private http: HttpClient) { }

  createComplain(data: any): Observable<any> {
    //console.log(data);
    return this.http.post(baseUrl, data);
  }
  getAllComplains(): Observable<Complain[]> {
    return this.http.get<Complain[]>(baseUrl);
  }
  getAllComplainswithstatus(): Observable<Complain[]> {
    return this.http.get<Complain[]>(baseUrlAll);
  }
  getallComplainswithstatusforAll(): Observable<Complainstatus[]> {
    return this.http.get<Complainstatus[]>(baseUrlstatus);
  }
  getAllComplainswithstatusCostomer(id:any): Observable<Complain[]> {
    return this.http.get<Complain[]>(`${baseUrlCostomer}/${id}`);
  }
  getresolvedComplainsCostomer(uid:any): Observable<Complain[]> {
    return this.http.get<Complain[]>(`${baseUrlmycomplains}/${uid}`);
  }

  createComplainstatus(data: any): Observable<any> {
    console.log(data);
    return this.http.post(baseUrlstatus, data);
  }

  getallComplainsstatusforengineer(assignto:any): Observable<Complainstatus[]> {
    return this.http.get<Complainstatus[]>(`${baseUrlEpending}/${assignto}`);
  }
  getallresolvedforengineer(assignto:any): Observable<Complainstatus[]> {
    return this.http.get<Complainstatus[]>(`${baseUrlEresolved}/${assignto}`);
  }
  updatestatusBycsid(csid: any,data:any): Observable<Complainstatus> {
    // console.log("select by id"+id+"update by data"+data.usertype.utid);
     return this.http.put(`${baseUrlstatus}/${csid}`,data);
   }
   updatestatusBycid(cid: any,data:any): Observable<Complain> {
    // console.log("select by id"+id+"update by data"+data.usertype.utid);
     return this.http.put(`${baseUrl}/${cid}`,data);
   }
  
}
