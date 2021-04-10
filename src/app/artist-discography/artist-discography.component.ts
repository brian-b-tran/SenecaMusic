import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy{
albums: Array<any>;
artist: any;
id: any;
private artistSub;
private albumsSub;
private paramsSub;
  constructor(private MusicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => { this.id = params['id']; });

    this.artistSub = this.MusicData.getArtistById(this.id).subscribe(artist=> {this.artist = artist;});
    
    this.albumsSub = this.MusicData.getAlbumsByArtistId(this.id).subscribe(albums=>{
      this.albums = albums.items.filter((filter, index) => {   
          return albums.items.findIndex(track => track.name == filter.name) == index;     
      });
    });
  }

  ngOnDestroy(){
    this.paramsSub.unsubscribe();
    this.artistSub.unsubscribe();
    this.albumsSub.unsubscribe();
  }

}
