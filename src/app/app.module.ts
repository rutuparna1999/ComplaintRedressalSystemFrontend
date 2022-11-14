import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SidebarModule} from 'ng-sidebar';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginService } from './services/login.service';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsermanageComponent } from './components/usermanage/usermanage.component';
import { ComplainsComponent } from './components/complains/complains.component';
import { CommonComponent } from './components/common/common.component';
import { ForengineeerComponent } from './components/forengineeer/forengineeer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FeedbackComponent } from './components/feedback/feedback.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UsermanageComponent,
    ComplainsComponent,
    CommonComponent,
    ForengineeerComponent,
    FeedbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SidebarModule.forRoot(),
    BrowserAnimationsModule, // required animations module
	  ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
