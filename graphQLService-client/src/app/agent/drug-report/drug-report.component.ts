import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../users.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Prescription, User} from "../../model/user";

@Component({
  selector: 'app-drug-report',
  templateUrl: './drug-report.component.html',
  styleUrls: ['./drug-report.component.css']
})
export class DrugReportComponent implements OnInit {

  users: User[] =[];
  patients:User[]=[];
  drugs:Map<String, number>=new Map<string, number>();
  loading = true;
  error: any;
  counter = 0;
  currentId:string;
  displayStyle = "none";
  d:String="";
  dNum:number=0;

  constructor(private router: Router, private route: ActivatedRoute,private usersService:UsersService,private builder: FormBuilder) {}
  ngOnInit(): void {
    this.usersService.getUser().subscribe(
      ({ data, loading }) => {
        this.users = data && data.users;
        this.loading = loading;
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }

  openPopup(currentDrug: String, numDrugs: number) {
    this.d = currentDrug;
    this.dNum = numDrugs;
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  /* create prescription form*/
  findAllDrugs() {
    this.users.forEach((element, index: any)=> {
      if(element.role === "Patient"){
        this.patients[this.counter] = element;
        this.counter++;
      }
    })
    this.patients.forEach((element, index: any)=>{
      this.usersService.getPrescription(element.username.trim()).subscribe(
        ({ data, loading }) => {
        data.prescriptions.forEach((p: Prescription, index: any)=>{
          let drug: String;
          drug = p.drug;
          if(this.drugs.has(drug)){
            let temp: number;
            temp = this.drugs.get(drug) ?? 1;
            this.drugs.set(drug, temp+1);
            
          } else {
            this.drugs.set(drug, 1);
          }
        });
      },
      (error: any) => {
        console.log("error")
      });
    });
  }
}
