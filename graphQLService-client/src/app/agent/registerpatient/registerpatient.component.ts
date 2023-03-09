import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../users.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {User} from "../../model/user";

@Component({
  selector: 'app-registerpatient',
  templateUrl: './registerpatient.component.html',
  styleUrls: ['./registerpatient.component.css']
})
export class RegisterpatientComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,private usersService:UsersService,private builder: FormBuilder) {}


  /*Register Agent use case*/
  personForm = this.builder.group({

    username : new FormControl('',
      [Validators.required]),
    password : new FormControl('',
      [Validators.required]),
    firstName : new FormControl('',
      [Validators.required]),
    lastName : new FormControl('',
      [Validators.required]),
    gender : new FormControl('',
      [Validators.required]),
    dateOfBirth : new FormControl('',
      [Validators.required]),
    allergies: new FormControl('',),
    currentMedications : new FormControl('',),
    insuranceNumber : new FormControl('',
      [Validators.required]),

  });


  onSubmit(): void {
    console.log(this.personForm.value)

    const user = new User(
      "0",
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
    this.usersService.addPatient(user).subscribe(_=>{});
    this.personForm.reset();
    window.location.reload();
  }

  ngOnInit(): void {
  }


}
