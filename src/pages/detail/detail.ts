import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Contact } from '../../classes/contact.class';
import { EditPage } from '../edit/edit';
import { ContactService } from '../../services/contact.service';


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  contact: Contact = new Contact();

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.contact = this.navParams.data;
  }

  onRemove(){
    let loader = this
    .loadingCtrl
    .create({content: "Please wait..."});
    loader.present();
    this.contactService.removeById(this.contact.id).subscribe(output=>{
      loader.dismiss();
      this.navCtrl.pop();
      this.msgHandler('Success', 'Contact deleted');
    },error=>{
      loader.dismiss();
      this.msgHandler('Error',error);
    })
  }

  confirmRemove() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Are you sure want to delete '+ this.contact.full_name,
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('do nothing');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.onRemove();
          }
        }
      ]
    });
    confirm.present();
  }

  onEdit(){
    this.navCtrl.push(EditPage, this.contact);
  }

  msgHandler(title: string, message: string){
    const alert = this
    .alertCtrl
    .create({title: title, message: message, buttons: ['Ok']});
    alert.present();
  }

}
