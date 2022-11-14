import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
const baseUrlbycom= 'http://localhost:8081/api/feedbackbycomplain';
const baseUrl = 'http://localhost:8081/api/feedback';
@Injectable({
  providedIn: 'root'
})

export class FeedbackService {

  constructor(private http: HttpClient) { }
  createFeedback(data: any): Observable<any> {
    //console.log(data);
    return this.http.post(baseUrl, data);
  }
  getfeedbackbycid(cid:any): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${baseUrlbycom}/${cid}`);
  }
  getAllfeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseUrl);
  }
}
