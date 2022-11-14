import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplainsComponent } from './components/complains/complains.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { ForengineeerComponent } from './components/forengineeer/forengineeer.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UsermanageComponent } from './components/usermanage/usermanage.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '',  component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent } ,
  { path: 'usermanage', component: UsermanageComponent } ,
  { path: 'complain', component: ComplainsComponent } ,
  { path: 'Engineers', component: ForengineeerComponent } ,
  { path: 'Feedback', component: FeedbackComponent } ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
