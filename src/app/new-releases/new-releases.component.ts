import { Component, OnInit, OnDestroy } from '@angular/core';
import { MusicDataService } from '../music-data.service';
@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit, OnDestroy {
  releases: Array<Object>;
  private newReleasesSub;
  
  constructor(private releasesData: MusicDataService) { }

  ngOnInit(){
    this.newReleasesSub = this.releasesData.getNewReleases().subscribe(releases=> {
      this.releases = releases.albums.items; 
     });
    
  }

  ngOnDestroy(){
    this.newReleasesSub.unsubscribe();
  }
}
