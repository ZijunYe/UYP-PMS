import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../users.service";
import {Prescription, User} from "../../model/user";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-verify-prescriptions',
  templateUrl: './verify-prescriptions.component.html',
  styleUrls: ['./verify-prescriptions.component.css']
})
export class VerifyPrescriptionsComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private usersService:UsersService) { }

  // users: User[]= [];
  prescriptions: Prescription[] =[];
  private subscription!: Subscription;
  loading = true;
  error: any;

  ngOnInit(): void {

    this.usersService.getAllPrescriptions().subscribe(
      ({data, loading}) => {
        this.prescriptions = data && data.allPrescriptions;
        this.loading = loading;
        //console.log("in prescriptions" + this.prescriptions);
        //console.log("data: " + data.prescriptions)
      },
      error => {
        // do something in the future maybe
        this.loading = false;
        this.error = error;
      }
    );
  }

  verify(prescription: Prescription) {
    this.usersService.verifyPrescription(prescription).subscribe(
      _=>{}
    );

    this.usersService.getAllPrescriptions().subscribe(
      ({data, loading}) => {
        this.prescriptions = data && data.allPrescriptions;
        this.loading = loading;
        //console.log("in prescriptions" + this.prescriptions);
        //console.log("data: " + data.prescriptions)
      },
      error => {
        // do something in the future maybe
        this.loading = false;
        this.error = error;
      }
    );

    window.location.reload();
  }



}
