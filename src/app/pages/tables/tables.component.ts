import { Component, OnInit } from '@angular/core';
import { MediaService } from 'src/app/shared/services/media.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  allMedia = { data: [] }
  mediaCount = 0;
  p: number = 1;
  searchInput="";
  public focus=true;
  constructor(private mediaService: MediaService) {

  }

  ngOnInit() {

    this.mediaService.getAllMedia(this.p).subscribe(response => {
      this.allMedia = response.data;
      this.mediaCount = response.count;

      console.log("data" + this.allMedia);
    });
  }

  getAllMedia() {
    console.log("page" + this.p)
    this.mediaService.getAllMedia(this.p).subscribe(response => {
      this.allMedia = response.data;
      this.mediaCount = response.count;

      console.log("data" + this.allMedia);
    });
  }
  serachMedia() {
    console.log("page" + this.p)
    this.mediaService.searchMedia(this.p,this.searchInput,this.searchInput).subscribe(response => {
      this.allMedia = response.data;
      this.mediaCount = response.count;

      console.log("data" + this.allMedia);
    });
  }
}
