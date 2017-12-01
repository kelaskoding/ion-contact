import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Contact } from '../../classes/contact.class';
import { ContactService } from '../../services/contact.service';


@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {

  contact: Contact = new Contact();

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.contact = this.navParams.data;
  }

  onUpdate(){
    let loader = this
    .loadingCtrl
    .create({content: "Please wait..."});
    loader.present();
    this.contactService.update(this.contact).subscribe(output=>{
      loader.dismiss();
      this.navCtrl.pop();
      this.msgHandler('Success', 'Contact updated');
    },error=>{
      loader.dismiss();
      this.msgHandler('Error',error);
    })
  }

  msgHandler(title: string, message: string){
    const alert = this
    .alertCtrl
    .create({title: title, message: message, buttons: ['Ok']});
    alert.present();
  }
}
