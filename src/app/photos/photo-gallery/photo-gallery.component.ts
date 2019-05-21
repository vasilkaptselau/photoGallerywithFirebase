import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/shared/photo.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {

  photoList: any[];
  rowIndexArray: any[];

  constructor(private service: PhotoService) { }

  ngOnInit() {
    this.service.photoDetailList.snapshotChanges().subscribe(
      list => {
        this.photoList = list.map(item => {
          return item.payload.val();
        });
        this.rowIndexArray = Array.from(Array(Math.ceil((this.photoList.length + 1) / 3)).keys());
      }
    );
  }

}
