import { SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Complain } from 'src/app/models/complain.model';
import { Complainstatus } from 'src/app/models/complainstatus.model';
import { Feedback } from 'src/app/models/feedback.model';
import { UserMaster } from 'src/app/models/user-master.model';
import { ComplainService } from 'src/app/services/complain.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UsermanageService } from 'src/app/services/usermanage.service';
import { UsertypesService } from 'src/app/services/usertypes.service';

@Component({
  selector: 'app-complains',
  templateUrl: './complains.component.html',
  styleUrls: ['./complains.component.css']
})
export class ComplainsComponent implements OnInit {
  closeResult: string = '';
  allnewComplainsforall?: Complain[];
  allnewComplainsforuser?: Complain[];
  compinarry?:any;
  getpincode?:number;
  getcid?:any;
  allComplainswithstatusforall?: Complainstatus[];
  allengineers?:UserMaster[];
  allresolvedcombyuser?:Complain[];
  active = 1;
  sessionuid?:any = null;
  sessionroleid?:any = null ;

  complaindata: Complain = {
    cid:'',
    complaindetail:'',
    pincode:0,
    status:'',
    createdby:{
    id:sessionStorage.getItem("userid"),
  },
	remark:'',
  };
  feedbackdata: Feedback = {
    fid:'',
    cid:{
      cid:'',
    },
    feedback:'',
    givenby:{
      id:sessionStorage.getItem("userid"),
    },
    usertype:{
      utid:sessionStorage.getItem("userroleid"),
    },
  };
  complainstatusdata: Complainstatus = {
    csid:'',
   cid:{
    cid:'',
   },
	status:'',
	remark:'',
	assignto:{
    id:'',
  },
	assignedby:{
    id:sessionStorage.getItem("userid"),
  },
  };
  constructor(private modalService: NgbModal,
    private UserManageService: UsermanageService,
    private ComplainService: ComplainService,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    //window.location.reload();
    this.sessionuid = sessionStorage.getItem("userid");
    this.sessionroleid= sessionStorage.getItem("userroleid");
    if(this.sessionroleid == 3){
      this.logout();
    }
    //console.log(this.sessionroleid);
    //console.log(this.sessionuid);
    if(this.sessionroleid != 4){
      this.getallComplainsforAll();
      this.getallComplainswithstatusforAll();
    }else{
      this.getallComplainsforuser();
      this.getresolvedComplainsforuser();
    }
    

  }
  opentoadd(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'addcomplain'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  opentoassign(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'addcomplain'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
  getallComplainsforAll():void{
    this.ComplainService.getAllComplainswithstatus()
      .subscribe({
        next: (data) => {
          //console.log(data);
          this.allnewComplainsforall = data;
          
        },
        error: (e) => console.error(e)
      });
  }
  getallComplainsforuser():void{
    this.ComplainService.getAllComplainswithstatusCostomer(this.sessionuid)
      .subscribe({
        next: (data) => {
         // console.log(data);
          this. allnewComplainsforuser= data;
          
        },
        error: (e) => console.error(e)
      });
  } 
  getresolvedComplainsforuser():void{
    this.ComplainService.getresolvedComplainsCostomer(this.sessionuid)
      .subscribe({
        next: (data) => {
          //console.log(data);
          this. allresolvedcombyuser= data;
          
        },
        error: (e) => console.error(e)
      });
  } 
  getallComplainswithstatusforAll():void{
    this.ComplainService.getallComplainswithstatusforAll()
      .subscribe({
        next: (data) => {
         // console.log(data);
          this.allComplainswithstatusforall = data;
          
        },
        error: (e) => console.error(e)
      });
  }
  saveecomplain():void{
    const data = {
      cid:this.complaindata.cid,
      complaindetail:this.complaindata.complaindetail,
      createdby: this.complaindata.createdby,
      pincode: this.complaindata.pincode,
      remark: this.complaindata.remark,
    };
    //console.log(data);
  this.ComplainService.createComplain(data)
      .subscribe({
        next: (res) => {
          //console.log(res);
          if(res.cid != ''){
            window.location.reload();
          }
    
        },
        error: (e) => console.error(e)
      });
  }
  onSelectChange(event:any) {
    const value = event.target.value;
    this.compinarry = value.split('`');
   // console.log((this.compinarry).at(1));
    this.getpincode=(this.compinarry).at(1);
    this.getallEngineers();
  }
 
 
  getallEngineers():void{
    this.UserManageService.getAllEngineers(this.getpincode)
      .subscribe({
        next: (data) => {
          //console.log(data);
          this.allengineers = data;
          
        },
        error: (e) => console.error(e)
      });
  }
  saveeassignto():void{
   this.getcid =  (this.complainstatusdata.cid).split('`').at(0);
    const data = {
      cid:{
        cid:this.getcid,
      },
     remark:this.complainstatusdata.remark,
     assignto:this.complainstatusdata.assignto,
     assignedby:this.complainstatusdata.assignedby,
    };
    //console.log(data);
    this.ComplainService.createComplainstatus(data)
      .subscribe({
        next: (res) => {
          //console.log(res);
          if(res.csid != ''){
            window.location.reload();
          }
    
        },
        error: (e) => console.error(e)
      });
  }
  givefeedback(cid:any,content:any):void{
    this.modalService.open(content, {ariaLabelledBy: 'feedbackmodal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.feedbackdata.cid.cid = cid;
    
  }
  saveefeedback():void{
    const data = {
      cid:this.feedbackdata.cid,
     feedback:this.feedbackdata.feedback,
     givenby:this.feedbackdata.givenby,
     usertype:this.feedbackdata.usertype
    };
  //  console.log(data);
  this.feedbackService.createFeedback(data)
      .subscribe({
        next: (res) => {
          //console.log(res);
          if(res.fid !=''){
            window.location.reload();
          }
    
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


