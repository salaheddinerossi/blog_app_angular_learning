import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  user:User={
    id:"",
    username:"",
    password:""
}
  errorMessage: string | null = null;

  constructor(private userService:UserService,private router:Router) {

  }

  onSubmit(){
    this.userService.login(this.user.username,this.user.password).subscribe(
      user=>{
        if(user){
          this.router.navigate(['/posts'])
        }else {
          this.errorMessage = "Invalid username or password"
        }
      },error => {
        this.errorMessage="An error occurred. Please try again."
      }
    )
  }

}
