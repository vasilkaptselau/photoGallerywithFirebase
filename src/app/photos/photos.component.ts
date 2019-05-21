import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../shared/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  constructor(private service: PhotoService) { }

  ngOnInit() {
    this.service.getPhotoDetailList();
  }

}
