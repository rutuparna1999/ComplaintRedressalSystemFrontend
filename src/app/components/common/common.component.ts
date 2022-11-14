import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {
  sessionuid?:any = null;
  sessionroleid?:any = null ;
  sessionfullname?:string;
  
  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.sessionuid = sessionStorage.getItem("userid");
    this.sessionroleid= sessionStorage.getItem("userroleid");
    this.sessionfullname = sessionStorage.getItem("userfullname")!;
    if(this.sessionuid == null){
      this.logout;
      this.router.navigate(['/home']);
    }
    
    //console.log(this.sessionuid );
    //console.log(this.sessionroleid );
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
