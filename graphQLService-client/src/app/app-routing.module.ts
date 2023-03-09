import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {VerifyPrescriptionsComponent} from "./agent/verify-prescriptions/verify-prescriptions.component";


import {AdminComponent} from "./admin/admin.component";
import {BrowseComponent} from "./admin/browse/browse.component";
import {RegisterComponent} from "./admin/register/register.component";
import {PatientComponent} from "./patient/patient.component";
import {AgentComponent} from "./agent/agent.component";
import {RegisterpatientComponent} from "./agent/registerpatient/registerpatient.component";
import {BrowsepatientComponent} from "./agent/browsepatient/browsepatient.component";
import {DrugReportComponent} from "./agent/drug-report/drug-report.component";



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent, // this is the component with the <router-outlet> in the template
    children: [
    ],
  },
  {path:'patient',component:PatientComponent,

  },
  // {path:'admin',component:AdminComponent,
  //   children: [
  //     {
  //       path: 'register',
  //       component: RegisterComponent, // another child route component that the router renders
  //     },
  //
  //     {
  //       path: 'browseagents',
  //       component: BrowseComponent, // another child route component that the router renders
  //     },
  //
  //   ],
  // },

  {path:'admin/:id',component:AdminComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent, // another child route component that the router renders
      },

      {
        path: 'browseagents',
        component: BrowseComponent, // another child route component that the router renders
      },

    ],
  },

  {path:'agent/:id',component:AgentComponent,
    children: [
      {
        path: 'register',
        component: RegisterpatientComponent, // another child route component that the router renders
      },
      {
        path: 'browse',
        component: BrowsepatientComponent, // another child route component that the router renders
      },
      {
        path: 'drug',
        component: DrugReportComponent, // another child route component that the router renders
      },

      {
        path:'prescriptions',
        component: VerifyPrescriptionsComponent, // another child route component that the router renders
      },

    ],



  },
  {path:'patient/:id',component:PatientComponent},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', component: LoginComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
