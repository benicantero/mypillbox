import { Medicina } from '../modelos/medicina';
import { MedicinasService } from '../servicios/medicinas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { AngularFireStorage } from '@angular/fire/storage';

import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  medicina: Medicina = { nombre: '', foto: null, path: '' };

  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  imagePath: string; // direccion de la imagen en firebase
  upload: any;

  constructor(
    private router: Router,
    private medicinaFirestore: MedicinasService,
    private camera: Camera,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public afSG: AngularFireStorage
  ) { }


  ngOnInit() {
  }
  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      console.log(libraryImage);
      this.image = 'data:image/jpg;base64,' + libraryImage;
    }
  }

  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  async uploadFirebase() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.imagePath = new Date().getTime() + '.jpg';

    this.upload = this.afSG.ref(this.imagePath).putString(this.image, 'data_url');
    this.upload.then(async () => {
      //this.image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: '',
        message: 'La foto se ha seleccionado correctamente',
        buttons: ['OK']
      });
      await alert.present();
    });

  }


  nuevaMedicina() {
    this.medicina.foto = this.imagePath;
    console.log(this.medicina);

    this.medicinaFirestore.altaMedicina(this.medicina).then(
      () => this.router.navigate(['listM'])
    );
  }

  salir() { this.router.navigate(['listM']); }

}
