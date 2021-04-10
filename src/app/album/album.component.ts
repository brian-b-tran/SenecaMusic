import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
  album: any;
  id: any;
  private albumSub;
  private paramsSub;

  constructor(private MusicData: MusicDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.albumSub = this.MusicData.getAlbumById(this.id).subscribe(album=> {
      this.album = album;
    });
  
  }
  ngOnDestroy(){
    this.albumSub.unsubscribe();
    this.paramsSub.unsubscribe();
  }
  addToFavourites(trackID){
    this.MusicData.addToFavourites(trackID).subscribe(
    ()=>{
      this.snackBar.open("adding to Favourties...", "Done", {duration:1500});
    },
    (err)=>{
      this.snackBar.open("adding to Favourties...", "An Error Occurred", {duration:1500});
    });
  }
}
