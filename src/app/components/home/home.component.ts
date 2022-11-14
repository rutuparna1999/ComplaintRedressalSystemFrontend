import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sessionuid?:any = null;
  sessionfullname?:string;
  constructor() { }

  ngOnInit(): void {
    this.sessionuid = sessionStorage.getItem("userid");
    this.sessionfullname = sessionStorage.getItem("userfullname")!;
  }
  

}
