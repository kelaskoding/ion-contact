import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Contact } from '../../classes/contact.class';
import { SearchPage } from '../search/search';
import { AddPage } from '../add/add';
import { DetailPage } from '../detail/detail';
import { CallNumber } from '@ionic-native/call-number';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts: Contact[] = [];

  constructor(public navCtrl: NavController, private contactService: ContactService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, 
    private callNumber: CallNumber, public dom: DomSanitizer) {

  }

  ionViewWillEnter(){
    let loader = this
    .loadingCtrl
    .create({content: "Please wait..."});
    loader.present();
    this.contactService.findAll().subscribe(output=>{
      loader.dismiss();
      this.contacts = output;
    }, error=>{
      loader.dismiss();
      this.errorHandler(error);
    });
  }

  onGotoAddContactPage(){
    this.navCtrl.push(AddPage);
  }

  onGotoSearchContactPage(){
    this.navCtrl.push(SearchPage);
  }

  onGotoDetailContactPage(contact){
    this.navCtrl.push(DetailPage, contact);
  }

  onCallNumber(phone){
    this.callNumber.callNumber(phone,true);
  }

  errorHandler(error){
    const alert = this
    .alertCtrl
    .create({title: 'Error', message: error, buttons: ['Ok']});
    alert.present();
  }

}
