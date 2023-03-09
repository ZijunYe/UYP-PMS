import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../users.service";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {find} from "rxjs/operators";

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
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

    username : new FormControl(''),
    password : new FormControl(''),
    lienceId : new FormControl(''),
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    title : new FormControl(''),
    phoneNumber : new FormControl(''),
    emailAddress : new FormControl('',),
    faxNumber : new FormControl(''),
  });


  onSubmit(): void {
    console.log(this.personForm.value);
    //this.findAgent(this.currentId);
    console.log(<string>this.personForm.value.password)
    const user = new User(
      this.currentAgent.userId,
      <string>this.personForm.value.username,
      <string>this.personForm.value.password,
      this.currentAgent.role,
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
      "null")


    if(user.username ===""){
      user.username = this.currentAgent.username
    }

    if(user.password ===""){
        user.password = this.currentAgent.password
      }
    if(user.licenceId ===""){
      user.licenceId = this.currentAgent.licenceId
    }
    if(user.firstName ===""){
      user.firstName = this.currentAgent.firstName
    }
    if(user.lastName ===""){
      user.lastName = this.currentAgent.lastName
    }
    if(user.title ===""){
      user.title = this.currentAgent.title
    }
    if(user.telephoneNumber ===""){
      user.telephoneNumber = this.currentAgent.telephoneNumber
    }
    if(user.email ===""){
      user.email = this.currentAgent.email
    }
    if(user.faxNumber ===""){
      user.faxNumber = this.currentAgent.faxNumber
    }
    console.log(user)
    this.usersService.modifyUser(user).subscribe(_=>{});
    this.personForm.reset();
    window.location.reload()
  }
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

  findAllAgent(){
    if(this.loadRequired){
      this.users.forEach((element, index: any)=> {
        if(element.role === "Agent"){
          this.agents[this.counter] = element;
          this.counter++;
          console.log(element.username)
        }
      })
      this.loadRequired = false;
    }else{
      window.location.reload();
    }


  }

  findAgent(username:string){

    this.usersService.getUserByUsername(username).subscribe(
      ({ data, loading }) => {
        console.log("I am here")
        this.currentAgent = data.userByUsername;
        console.log(this.currentAgent.password)
      },
      (error: any) => {
        console.log("why i m here")
      });

  }


  users: User[] =[];
  agents:User[]=[];
  loading = true;
  error: any;
  counter = 0;
  u:User;
  currentAgent:User;
  loadRequired = true;


  delete(agent: User) {
    console.log(agent)
    this.usersService.deleteUser(agent).subscribe(_=>{})
    window.location.reload()
  }

  modify(agent:User){
    const x = document.getElementById("modify");
    this.findAgent(agent.username)
    if(x!=null){
      if(x.style.display ==="block"){
        x.style.display="none";
      }else{
        x.style.display ="block";
      }
    }

  }

  hide() {
    const x = document.getElementById("modify");
    if(x!=null){
      x.style.display ="none"

    }
  }
}
