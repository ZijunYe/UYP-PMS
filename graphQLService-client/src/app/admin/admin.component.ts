import { Component, OnInit } from '@angular/core';
import { UsersService} from "../users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {User} from "../model/user";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  ngOnInit() {
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
  /*Browsing agent functionality*/
  findAllAgent() {
    this.users.forEach((element, index: any)=> {
      if(element.role === "Agent"){
        this.agents[this.counter] = element;
        this.counter++;
        console.log(element.username)
      }
    })
  }



  users: User[] =[];
  agents:User[]=[];
  loading = true;
  error: any;
  counter = 0;


  constructor(private router: Router, private route: ActivatedRoute,private usersService:UsersService,private builder: FormBuilder) {}


  /*Register Agent use case*/
  personForm = this.builder.group({
    /*
          username:u.username,
          password:u.password,
          licenceId: u.licenceId,
          firstname:u.firstName,
          lastName:u.lastName,
          title:u.title,
          telephoneNumber:u.telephoneNumber,
          email:u.email,
          faxNumber:u.faxNumber
     */

    username : new FormControl('',
      [Validators.required]),
    password : new FormControl('',
      [Validators.required]),
    lienceId : new FormControl('',
      [Validators.required]),
    firstName : new FormControl('',
      [Validators.required]),
    lastName : new FormControl('',
      [Validators.required]),
    title : new FormControl('',
      [Validators.required]),
    phoneNumber : new FormControl('',
      [Validators.minLength(4)
      ]),
    emailAddress : new FormControl('',
      [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    faxNumber : new FormControl('',
      [Validators.required]),

  });


  onSubmit(): void {
    console.log(this.personForm.value)

    const user = new User(
      <string>this.personForm.value.username,
      <string>this.personForm.value.password,
      "0",
      "Agent",
      <string>this.personForm.value.lienceId,
      <string>this.personForm.value.firstName,
      <string>this.personForm.value.lastName,
      <string>this.personForm.value.title,
      <string>this.personForm.value.phoneNumber,
      <string>(this.personForm.value.emailAddress),
      <string>this.personForm.value.faxNumber,
      "null",
      "null",
      "null",
      "null",
      "null",
      "null",


      )
    this.usersService.addAgent(user).subscribe(_=>{});
    this.personForm.reset();
  }
}
