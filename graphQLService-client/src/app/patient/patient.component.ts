import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User, Prescription } from '../model/user';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(private router: Router,private route: ActivatedRoute, private usersService:UsersService) { }

  selectedUser: User | null = null;
  prescriptions: Prescription[] =[];
  private subscription!: Subscription;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      this.subscription = this.usersService.getUserByUsername(id).subscribe(
        ({ data, loading }) => {
          this.selectedUser = data.userByUsername;
        },
        (error: any) => {
          this.selectedUser = null;
      });
      this.subscription = this.usersService.getPrescription(id).subscribe(
        ({ data, loading }) => {
          this.prescriptions = data.prescriptions;
        },
        (error: any) => {
          this.prescriptions = [];
        }
      );
    });
  }

}
