import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  photoDetailList: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getPhotoDetailList() {
    this.photoDetailList = this.firebase.list('photoDetails');
  }

  insertImageDetails(photoDetails) {
    this.photoDetailList.push(photoDetails);
  }
}
