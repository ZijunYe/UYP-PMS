import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, Routes} from "@angular/router";
import { UsersService} from "../users.service";
import {User} from "../model/user";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


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

  loading = true;
  error: any;
  users: User[] =[];
  s = "Login in succussfully!"
  f ="Incorrect password!"
  u ="Your account is not existsed"


  constructor(private router: Router, private route: ActivatedRoute,private usersService:UsersService) {}
 onSubmit(userName: string, password: string){
      this.users.forEach((element,index)=> {
        if (element.username === userName) {
          //check if the user is exists
          if (element.password === password) {
            //check if the password correct
            if(element.role ==="Admin"){
              this.router.navigate(['admin',element.username]);
            }else if(element.role ==="Agent"){
              this.router.navigate(['agent',element.username]);
            }else if(element.role ==="Patient"){
              this.router.navigate(['patient',element.username]);
            }

          }
        }
      }
      )
  }


}
