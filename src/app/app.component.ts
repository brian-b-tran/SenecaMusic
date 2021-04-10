/********************************************************************************* 
* WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Brian Tran     Student ID: 137 194 189     Date: Friday april 9 2021 
*  
* Online Link: 
*
*********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService} from './auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  token: any = null;
  title : string = 'web422-a6';
  searchString: string;
  constructor( private router: Router, private auth : AuthService ){}
  ngOnInit(){
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationStart){
        this.token = this.auth.readToken();
      }
    });
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  handleSearch(){
    this.router.navigate(['/search'], { queryParams: { q: this.searchString } });
    this.searchString = "";
  }
}
