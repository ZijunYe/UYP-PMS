import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../users.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {User, Prescription} from "../../model/user";

@Component({
  selector: 'app-browsepatient',
  templateUrl: './browsepatient.component.html',
  styleUrls: ['./browsepatient.component.css']
})
export class BrowsepatientComponent implements OnInit {
  users: User[] =[];
  patients:User[]=[];
  loading = true;
  error: any;
  counter = 0;
  currentId:string;
  u:User;
  currentPatient:User;
  loadRequired=true;


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

  /* button*/
  delete(patient: User) {
    this.usersService.deleteUser(patient).subscribe(_=>{})
    window.location.reload()
  }

  modify(patient: User) {
    const x = document.getElementById("modify");
    this.findPatient(patient.username);
    console.log("Current here")
    if(x!=null){
      if(x.style.display ==="block"){
        x.style.display="none";
      }else{
        x.style.display ="block";
      }
    }


  }

  CreatePrescription(patient: User) {
    this.findPatient(patient.username)
    const x = document.getElementById("createPrescriptionForm");
    if(x!=null){
      if(x.style.display ==="block"){
        x.style.display="none";
      }else{
        x.style.display ="block";
      }
    }

  }


  /* modify patient information use case form*/
  personForm = this.builder.group({

    username : new FormControl('',),
    password : new FormControl('',),
    firstName : new FormControl('',),
    lastName : new FormControl('',),
    gender : new FormControl('',),
    dateOfBirth : new FormControl('',),
    allergies: new FormControl('',),
    currentMedications : new FormControl('',),
    insuranceNumber : new FormControl('',
      [Validators.required]),
  });

  prescriptionForm = this.builder.group({
    prescriptionNumber : new FormControl('',
      [Validators.required]),
    username : new FormControl('',
      [Validators.required]),
    prescriptionDate : new FormControl('',
      [Validators.required]),
    medicationStrength : new FormControl('',
      [Validators.required]),
    amount : new FormControl('',
      [Validators.required]),
    method : new FormControl('',
      [Validators.required]),
    frequency : new FormControl('',
      [Validators.required]),
    optional : new FormControl('',
      [Validators.required]),
    status : new FormControl('',
      [Validators.required]),
    verified : new FormControl('',
      [Validators.required]),
    drug : new FormControl('',
      [Validators.required]),
  });


  onSubmit(): void {
    console.log(this.personForm.value)

    const user = new User(
      this.currentPatient.userId,
      <string>this.personForm.value.username,
      <string>this.personForm.value.password,
      "Patient",
      "null",
      <string>this.personForm.value.firstName,
      <string>this.personForm.value.lastName,
      "null",
      "null",
      "null",
      "null",
      "null",
      <string>this.personForm.value.gender,
      <string>this.personForm.value.dateOfBirth,
      <string>this.personForm.value.allergies,
      <string>this.personForm.value.currentMedications,
      <string>this.personForm.value.insuranceNumber,

    )
    if(user.username ===""){
      user.username = this.currentPatient.username
    }

    if(user.password ===""){
      user.password = this.currentPatient.password
    }
    if(user.firstName ===""){
      user.firstName = this.currentPatient.firstName
    }
    if(user.lastName ===""){
      user.lastName = this.currentPatient.lastName
    }
    if(user.gender ===""){
      user.gender = this.currentPatient.gender
    }
    if(user.dateOfBirth ===""){
      user.dateOfBirth = this.currentPatient.dateOfBirth
    }
    if(user.allergies ===""){
      user.allergies = this.currentPatient.allergies
    }
    if(user.currentMedications ===""){
      user.currentMedications = this.currentPatient.faxNumber
    }
    if(user.insuranceNumber ===""){
      user.insuranceNumber = this.currentPatient.insuranceNumber
    }

    console.log(user)
    this.usersService.modifyUser(user).subscribe(_=>{});
    this.personForm.reset();
    window.location.reload();
  }

  onSubmitPrescription():void {
    console.log(this.prescriptionForm.value)

    const prescription = new Prescription(
      '0',
      this.currentPatient.username,
      Number(<String>this.prescriptionForm.value.prescriptionNumber),
      <string>this.prescriptionForm.value.prescriptionDate,
      <string>this.prescriptionForm.value.medicationStrength,
      <string>this.prescriptionForm.value.amount,
      <string>this.prescriptionForm.value.method,
      <string>this.prescriptionForm.value.frequency,
      <string>this.prescriptionForm.value.optional,
      <string>this.prescriptionForm.value.status,
      <string>this.prescriptionForm.value.verified,
      <string>this.prescriptionForm.value.drug
    )
    console.log(prescription)
    this.usersService.createPrescription(prescription).subscribe(_=>{});
    this.personForm.reset();

  }

  /* create prescription form*/

  findAllPatient() {
    if(this.loadRequired){
    this.users.forEach((element, index: any)=> {
      if(element.role === "Patient"){
        this.patients[this.counter] = element;
        this.counter++;
        console.log(element.username)
      }
     })
      this.loadRequired = false;
    }else{
      window.location.reload();
    }
  }



  findPatient(username:string){
    this.usersService.getUserByUsername(username).subscribe(
      ({ data, loading }) => {
        console.log("I am here")
        this.currentPatient = data.userByUsername;
        console.log(this.currentPatient.password)
      },
      (error: any) => {
        console.log("why i m here")
      });

  }


}
