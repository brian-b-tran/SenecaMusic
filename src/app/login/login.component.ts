import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { AuthService } from '../auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user : User = {
  _id:null,
  userName:"",
  password:""
}
warning : string = "";
loading : boolean = false;
  constructor(private auth: AuthService, private route : Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    if(this.user.userName != ""){
      if(this.user.password != ""){
        this.loading = true;

        this.auth.login(this.user).subscribe((success)=>{
          this.loading = false;
          localStorage.setItem('access_token', success.token);
          this.route.navigate(['/newreleases']);
        },
        (err) =>{
          this.loading = false;
          this.warning = err.error.error;
        });
        
      }else{
        this.warning = "Password cannot be blank";
      }
    }else{
      this.warning = "UserName cannot be blank";
    }
  }

}
