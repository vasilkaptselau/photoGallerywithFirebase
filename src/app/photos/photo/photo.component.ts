import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { PhotoService } from 'src/app/shared/photo.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted = false;

  formTemplate = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl(''),
    photoUrl: new FormControl('', Validators.required)
  });

  constructor(private storage: AngularFireStorage, private service: PhotoService) { }

  ngOnInit() {
    this.resetForm();
  }
  preview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];

    } else {
      this.imgSrc = '../../../assets/img/image_upload.png';
      this.selectedImage = null;
    }
  }
  onSubmit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      const filePath = `${formValue.category}/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['photoUrl'] = url;
            this.service.insertImageDetails(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
    }
  }

  get formControls() {
    return this.formTemplate['controls'];
  }

  resetForm() {
    this.formTemplate.reset();
    this.formTemplate.setValue({
      caption: '',
      photoUrl: '',
      category: 'Natural'
    });
    this.imgSrc = '../../../assets/img/image_upload.png';
    this.selectedImage = null;
    this.isSubmitted = false;
  }
}
