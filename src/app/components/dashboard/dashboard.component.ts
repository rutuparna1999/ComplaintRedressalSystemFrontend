import { Component, OnInit } from '@angular/core';
import { UserMaster } from 'src/app/models/user-master.model';
import { UsermanageService } from 'src/app/services/usermanage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  useremail:string="";
  userrolename:string="";
  userroleid:any="";
  userfullname:string="";
  userid:any="";
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
  constructor(
    private UserManageService: UsermanageService,
  ) { }
  

  ngOnInit(): void {
    //window.location.reload();
 
   this.useremail=  sessionStorage.getItem("useremail")!;
    this.userfullname= sessionStorage.getItem("userfullname")!;
    this.userrolename= sessionStorage.getItem("userrolename")!;
    this.userroleid= sessionStorage.getItem("userroleid")!;
    this.userid= sessionStorage.getItem("userid")!;
    this.showuser(this.userid);

  }
  showuser(id: any){
    
    this.UserManageService.selectUserByid(id)
          .subscribe({
            next: (data) => {
             // console.log(data);
             
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

}
