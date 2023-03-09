import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../users.service";
import {User} from "../model/user";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  users: User[] = [];
  loading = true;
  error: any;
  username: string;
  selectedUser: User | null = null;
  private subscription!: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params.id;
      console.log(id)
      this.subscription = this.usersService.getUserByUsername(id).subscribe(
        ({ data, loading }) => {
          console.log("I am here")
          this.selectedUser = data.userByUsername;
          console.log(this.selectedUser?.lastName)
        },
        (error: any) => {
          this.selectedUser = null;
          console.log("why i m here")
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


   //this.route.snapshot.params['id'];
    //console.log(this.username);
    /*this.usersService.getUser().subscribe(
      ({data, loading}) => {
        this.users = data && data.users;
        this.loading = loading;
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );*/
  }

  /*check() {
    this.users.forEach((element,index)=> {
        if (element.username === this.username) {
          console.log("I am here")
          this.currentAgent = element;
          console.log(this.currentAgent.role)
        }
      }
    )

  }*/

/*
this.currentAgent.username = element.username;
  console.log(this.currentAgent.username);
  this.currentAgent.password = element.password;
  this.currentAgent.firstName = element.firstName;
  this.currentAgent.lastName = element.lastName;
  this.currentAgent.role = element.role;
  this.currentAgent.title = element.title;
  this.currentAgent.telephoneNumber = element.telephoneNumber;
  this.currentAgent.email = element.email;
  this.currentAgent.faxNumber = element.faxNumber;
 */


