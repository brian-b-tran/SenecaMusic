import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUser: RegisterUser = {
    userName:"",
    password:"",
    password2:""
  }
  warning: string = "";
  success: boolean = false;
  loading : boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){

    if( this.registerUser.userName != ""){
      if(this.registerUser.password == this.registerUser.password2){
        this.loading = true;
        
        this.auth.register(this.registerUser).subscribe(
        ()=>{
          this.success = true;
          this.warning = null;
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.error;
          this.loading = false;
        });
      }
      else{this.warning = "Passwords do not match";}
    }
    else{this.warning = "UserName cannot be empty";}
  }

}
