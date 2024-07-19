import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './error/error.component';
import { MakeServiceRequestComponent} from './homepage/makeServiceRequest/makeServiceRequest.component';
import { UserprofileComponent } from './homepage/userprofile/userprofile.component';
import { InProgressComponent } from './homepage/inProgress/inProgress.component';
import { AssignedRequestsComponent } from './homepage/assignedRequests/assignedRequests.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomepageComponent,
    ErrorComponent,
    MakeServiceRequestComponent,
    UserprofileComponent,
    InProgressComponent,
    AssignedRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
