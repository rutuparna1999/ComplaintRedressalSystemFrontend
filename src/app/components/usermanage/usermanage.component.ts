import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { UserMaster } from 'src/app/models/user-master.model';
import { UserTypeMaster } from 'src/app/models/user-type-master.model';
import { UsermanageService } from 'src/app/services/usermanage.service';
import { UsertypesService } from 'src/app/services/usertypes.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css']
})
export class UsermanageComponent implements OnInit {
  closeResult: string = '';
  selected:string = 'selected';
  allUserTypes?: UserTypeMaster[];
  allusers?: UserMaster[];
  updatedbyid?:any=0;
  isDisabled: boolean = false;  
  deletebyid:any;
  Useradddata: UserMaster = {
    id:'',
	fullname:'',
	email:'',
	password:'',
	usertype:{
    utid:'',
  },
	pincode:0,
	address:'',
   
  };
  sessionuid?:any = null;
  sessionroleid?:any = null ;
  constructor(private modalService: NgbModal,
    private UserTypeService: UsertypesService,
    private UserManageService: UsermanageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

    ngOnInit(): void {
      //console.log("hii i am here");
      this.sessionuid = sessionStorage.getItem("userid");
      this.sessionroleid= sessionStorage.getItem("userroleid");
      if(this.sessionroleid != 1){
        this.logout();
      }
      this.getallusertypes();
      this.getallusers();
    }
   
  open(content:any) {
    
    this.Useradddata = {
      id:'',
      fullname:'',
      email:'',
      password:'',
      usertype:{
        utid:'',
      },
      pincode:0,
      address:'',
    };
    this.isDisabled= false;
    this.modalService.open(content, {ariaLabelledBy: 'useraddEditid'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  deleteusermodelopen(id:any,content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'userdeletebyid'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.Useradddata = {
      id:id,
    };
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
 
  getallusertypes():void{
    this.UserTypeService.getAllusertypes()
      .subscribe({
        next: (data) => {
         // console.log(data);
          this.allUserTypes = data;
          
        },
        error: (e) => console.error(e)
      });
  }

  saveeuser():void{
    const data = {
      id:this.Useradddata.id,
      fullname:this.Useradddata.fullname,
      email: this.Useradddata.email,
      password: this.Useradddata.password,
      usertype: this.Useradddata.usertype,
      pincode: this.Useradddata.pincode,
      address: this.Useradddata.address,
    };
  //console.log(data);
  this.updatedbyid = data.id;
  if(this.updatedbyid!= ''){
   console.log("EDIT OPERATION");
   this.UserManageService.updateUserByid(this.updatedbyid,data)
      .subscribe({
        next: (res) => {
          console.log(res);
         if(res.id){
          this.toastr.success( 'User Updated successfully.');
          window.location.reload();
         }else{
          this.toastr.error( 'Failed to update User.');
         }
        },
        error: (e) => console.error(e)
      });
  }else{
    console.log("ADD OPERATION");
  this.UserManageService.createUser(data)
      .subscribe({
        next: (res) => {
          console.log(res.id);
         if(res.id != ''){
          this.toastr.success( 'User Saved successfully.');
          window.location.reload();
         }else{
          this.toastr.error( 'Failed to save User.');
         }
         this.Useradddata = {
          id:'',
          fullname:'',
          email:'',
          password:'',
          usertype:{
            utid:'',
          },
          pincode:0,
          address:'',
        };
    
        },
        error: (e) => console.error(e)
      });
  }
    
    
  }

  getallusers():void{
    this.UserManageService.getAllusers()
      .subscribe({
        next: (data) => {
          //console.log(data);
          this.allusers = data;
          
        },
        error: (e) => console.error(e)
      });
  }
  showuser(id: any,content:any){
//console.log(id);
this.isDisabled = true;
this.modalService.open(content, {ariaLabelledBy: 'useraddEditid'}).result.then((result) => {
  this.closeResult = `Closed with: ${result}`;
}, (reason) => {
  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
});

this.UserManageService.selectUserByid(id)
      .subscribe({
        next: (data) => {
          //console.log(data);
         
          this.Useradddata = {
            id:data.id,
            fullname:data.fullname,
            email:data.email,
            password:data.password,
            usertype:{
              utid:data.usertype?.utid,
            },
            pincode:data.pincode,
            address:data.address,
          };
        
        },
        error: (e) => console.error(e)
      });
  }

  deleteuserbyid(){
 this.deletebyid=this.Useradddata.id;
 //console.log(this.deletebyid);
 this.UserManageService.deleteUserByid(this.deletebyid)
 .subscribe({
   next: (res) => {
     //console.log(res);
     if(res.deleted == true){
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
