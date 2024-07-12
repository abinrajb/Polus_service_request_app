import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http'
import { ErrorComponent } from './error/error.component';
import { AssignedRequestsComponent } from './homepage/assignedRequests/assignedRequests.component';
import { InProgressComponent } from './homepage/inProgress/inProgress.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'homepage', component: HomepageComponent,
    children: [
      { path: 'msr', component: AssignedRequestsComponent },
      { path: 'ip', component: InProgressComponent },
      { path: 'ar', component: AssignedRequestsComponent },
  ]
  },
  {path:'error', component: ErrorComponent},
  {path:'**', redirectTo:'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
