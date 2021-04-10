import { Component, OnInit, OnDestroy } from '@angular/core';
import {MusicDataService} from '../music-data.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {
  favourites: Array<any>;
  private favSub;
  constructor(private MusicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.favSub = this.MusicData.getFavourites().subscribe(list => {
      this.favourites = list.tracks;
    });
  }

  ngOnDestroy(){
    this.favSub.unsubscribe();
  }

  removeFromFavourites(id){
    this.MusicData.removeFromFavourites(id).subscribe(
    (list) => {
      this.favourites = list.tracks;
    }, 
    (err)=>{
      console.log(err);
    });
  }
}
