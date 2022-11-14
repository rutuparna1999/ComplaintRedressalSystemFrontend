import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    
  }
  constructor(private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router) { }
  
  userLogin: Login = {
    email: '',
    password: '',
   
  };

  form = new FormGroup({
   
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
   
  });
   
  get f(){
    return this.form.controls;
  }
   
  submit(){
   // console.log(this.form.value);
    const email = this.userLogin.email;
    const password = this.userLogin.password;
   
 // console.log("hii here i am with " +email+"and with "+password)
    this.loginService.logintomyaccount(email,password)
      .subscribe({
        next: (data) => {
          console.log(data);
          sessionStorage.setItem("useremail",data.email);
          sessionStorage.setItem("userfullname",data.fullname!);
          sessionStorage.setItem("userrolename",data.usertype?.roleName!);
          sessionStorage.setItem("userroleid",data.usertype?.utid!);
          sessionStorage.setItem("userid",data.id!);

         //console.log(data);
         this.router.navigate(['/dashboard']);
         
        },
        error: (e) => console.error(e)
      });
  }
}
