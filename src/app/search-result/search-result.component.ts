import { Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
results: any;
searchQuery: any;
private searchSub;
private querySub;
  constructor(private MusicData: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.querySub = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'];
    });

    this.searchSub = this.MusicData.searchArtists(this.searchQuery).subscribe( results => {
      this.results = results.artists.items.filter(items => {return items.images.length > 0;});
    });
  }

  ngOnDestroy(): void{
    this.searchSub.unsubscribe();
    this.querySub.unsubscribe();
  }
}
