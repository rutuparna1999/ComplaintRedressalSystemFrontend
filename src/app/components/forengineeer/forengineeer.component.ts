import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UsermanageService } from 'src/app/services/usermanage.service';
import { UsertypesService } from 'src/app/services/usertypes.service';
import { ComplainService } from 'src/app/services/complain.service';
import { Complainstatus } from 'src/app/models/complainstatus.model';
import { Complain } from 'src/app/models/complain.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';
@Component({
  selector: 'app-forengineeer',
  templateUrl: './forengineeer.component.html',
  styleUrls: ['./forengineeer.component.css'],
})
export class ForengineeerComponent implements OnInit {
  closeResult: string = '';
  active = 1;
  sessionuid?:any = null;
  sessionroleid?:any = null ;
 updatedbycsid?:any;
 updatedbycid?:any;
 viewbycid?:any;
 allfeedbackbycid?:Feedback[];
  allComplainsengineers?: Complainstatus[];
  allComplainsreengineers?: Complainstatus[];
  legnthoffeedback?:any;
  complainstatusdata: Complainstatus = {
    csid:'',
   cid:{
    cid:'',
   },
	status:'',
  };
  complaindata: Complain = {
    cid:'',
    status:'',
  };
  constructor(private modalService: NgbModal,
    private UserTypeService: UsertypesService,
    private UserManageService: UsermanageService,
    private ComplainService: ComplainService,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sessionuid = sessionStorage.getItem("userid");
    this.sessionroleid= sessionStorage.getItem("userroleid");
    if(this.sessionroleid != 3){
      this.logout();
    }
   // console.log(this.sessionroleid);
   this.getallComplainsforEnginner();
   this.getallComplainsresolvedforEnginner();
  }
  
  getallComplainsforEnginner():void{
    this.ComplainService.getallComplainsstatusforengineer(this.sessionuid)
      .subscribe({
        next: (data) => {
          //console.log(data);
          this. allComplainsengineers= data;
          
        },
        error: (e) => console.error(e)
      });
  }
  getallComplainsresolvedforEnginner():void{
    this.ComplainService.getallresolvedforengineer(this.sessionuid)
      .subscribe({
        next: (data) => {
          //console.log(data);
          this. allComplainsreengineers= data;
          
        },
        error: (e) => console.error(e)
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  updatestatus(id:any,cid:any,content:any):void{
    this.modalService.open(content, {ariaLabelledBy: 'updatestatusModal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.complainstatusdata = {
      csid:id,
    };
    this.complaindata = {
      cid:cid,
    };
  }
 
  updatestatussave():void{
    this.updatedbycsid=this.complainstatusdata.csid;
    this.updatedbycid=this.complaindata.cid;
    const data = {
     status:this.complainstatusdata.status
    }
    const aadata = {
      status :this.complainstatusdata.status
    }

    //console.log(data);
    this.ComplainService.updatestatusBycsid(this.updatedbycsid,data)
    .subscribe({
      next: (res) => {
       // console.log(res);
       if(res.csid!=''){
         window.location.reload();
       }
       
      },
      error: (e) => console.error(e)
    });
    this.ComplainService.updatestatusBycid(this.updatedbycid,data)
    .subscribe({
      next: (res) => {
        console.log(res);
       
      },
      error: (e) => console.error(e)
    });
  } 

  updatestatusclose(csid:any,cid:any):void{
    this.updatedbycsid=csid
    this.updatedbycid=cid;
    const data = {
      status:"CLOSED",
     }
     const aadata = {
       status :"CLOSED",
     }
     //console.log(data);
    this.ComplainService.updatestatusBycsid(this.updatedbycsid,data)
    .subscribe({
      next: (res) => {
        console.log(res);
       
      },
      error: (e) => console.error(e)
    });
    this.ComplainService.updatestatusBycid(this.updatedbycid,data)
    .subscribe({
      next: (res) => {
        console.log(res);
       
      },
      error: (e) => console.error(e)
    });
  }
  viewfeedback(cid:any,content:any):void{
    this.modalService.open(content, {ariaLabelledBy: 'viewfeedback'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.viewbycid = cid;
    this.feedbackService.getfeedbackbycid(this.viewbycid)
    .subscribe({
      next: (data) => {
        console.log(data);
        this. allfeedbackbycid= data;
        this.legnthoffeedback = (this. allfeedbackbycid).length;
        //console.log(this.legnthoffeedback);
        
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
