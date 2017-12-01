import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../classes/contact.class';


@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  contact: Contact = new Contact();

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
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

  msgHandler(title: string, message: string){
    const alert = this
    .alertCtrl
    .create({title: title, message: message, buttons: ['Ok']});
    alert.present();
  }


}
