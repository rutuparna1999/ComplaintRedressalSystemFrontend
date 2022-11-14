import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  sessionuid?:any = null;
  sessionroleid?:any = null ;
  allfeedbacks?: Feedback[];
  constructor(
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sessionuid = sessionStorage.getItem("userid");
    this.sessionroleid= sessionStorage.getItem("userroleid");
    if(this.sessionroleid == 3 || this.sessionroleid == 4){
      this.logout();
    }
    this.getallfeedbacks();
  }
  getallfeedbacks():void{
    this.feedbackService.getAllfeedbacks()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.allfeedbacks = data;
          
        },
        error: (e) => console.error(e)
      });
  }
  logout(): void {
  
    sessionStorage.removeItem("useremail");
    sessionStorage.removeItem("userfullname");
    sessionStorage.removeItem("userrolename");
    sessionStorage.removeItem("userroleid");
    sessionStorage.removeItem("userid");
  
        this.router.navigate(['/home']);
    }

}
