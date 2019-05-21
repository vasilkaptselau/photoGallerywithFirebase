import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotosComponent } from './photos/photos.component';
import { PhotoComponent } from './photos/photo/photo.component';
import { PhotoGalleryComponent } from './photos/photo-gallery/photo-gallery.component';

const routes: Routes = [
  { path: '', redirectTo: 'photo/upload', pathMatch: 'full' },
  {
    path: 'photo', component: PhotosComponent,
    children: [
      { path: 'upload', component: PhotoComponent },
      { path: 'gallery', component: PhotoGalleryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
