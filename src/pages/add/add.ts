import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../classes/contact.class';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  contact: Contact = new Contact();

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, private contactService: ContactService,
    private loadingCtrl: LoadingController, 
    private alertCtrl: AlertController,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private base64: Base64,
    public dom: DomSanitizer,
    private actionSheetCtrl: ActionSheetController) {
  }


  onSave(){
    let loader = this
    .loadingCtrl
    .create({content: "Please wait..."});
    loader.present();
    this.contactService.save(this.contact).subscribe(output=>{
      loader.dismiss();
      this.navCtrl.pop();
      this.msgHandler('Success', 'Contact saved');
    },error=>{
      loader.dismiss();
      this.msgHandler('Error',error);
    })
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons:[
        {
          text: 'Choose from Gallery',
          handler: ()=>{
            this.chooseFromGallery();
          }
        },
        {
          text: 'Use Camera',
          handler: () =>{
            this.takePictureWithCamera();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  chooseFromGallery(){
    const options = {
      width: 200,
      height: 200,
      quality: 80
    }
    this.imagePicker.getPictures(options).then((results)=>{
      var file = results[0];
      this.base64.encodeFile(file).then(base64String=>{
        this.contact.photo = base64String;
      },error=>{
        this.msgHandler('Error',error);
      });
    },error=>{
      this.msgHandler('Error', error);
    });
  }

  takePictureWithCamera(){
    const options : CameraOptions = {
      quality: 80,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(imageData =>{
      let base64String = 'data:image/png;base64,' + imageData;
      this.contact.photo = base64String;
    },error=>{
      this.msgHandler('Error', error);
    })
  }

  msgHandler(title: string, message: string){
    const alert = this
    .alertCtrl
    .create({title: title, message: message, buttons: ['Ok']});
    alert.present();
  }
}
