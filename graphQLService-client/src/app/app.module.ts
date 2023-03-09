import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {LoginComponent} from "./login/login.component";


import { RegisterComponent } from './admin/register/register.component';
import { BrowseComponent } from './admin/browse/browse.component';
import {AdminComponent} from "./admin/admin.component";
import {AgentComponent} from "./agent/agent.component";
import {PatientComponent} from "./patient/patient.component";
import { BrowsepatientComponent } from './agent/browsepatient/browsepatient.component';
import { RegisterpatientComponent } from './agent/registerpatient/registerpatient.component';
import { DrugReportComponent } from './agent/drug-report/drug-report.component';
import {VerifyPrescriptionsComponent} from "./agent/verify-prescriptions/verify-prescriptions.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    PatientComponent,
    AgentComponent,
    RegisterComponent,
    BrowseComponent,
    BrowsepatientComponent,
    RegisterpatientComponent,
    DrugReportComponent,
    VerifyPrescriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
