import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../classes/contact.class';
import { DetailPage } from '../detail/detail';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  contacts: Contact[] = [];
  searching : any = false;
  searchTerm : string = '';
  searchControl : FormControl; 
  found: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private contactService: ContactService,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private callNumber: CallNumber) {
      this.searchControl = new FormControl();
  }

  onGotoDetailContactPage(contact){
    this.navCtrl.push(DetailPage, contact);
  }

  onSearchInput() {
    this.searching = true;
  }

  ionViewDidLoad() {
    this
      .searchControl
      .valueChanges
      .debounceTime(2000)
      .subscribe(search => {
        this.searching = false;
        this.searchContact();
      });
  }

  searchContact(){
    if (this.searchTerm.length > 0) {
      let searchItem  = {
        'searchKey': this.searchTerm
      }
      this.contacts = [];
      let loader = this
      .loadingCtrl
      .create({content: 'Searching..'});
      loader.present();
      this.contactService.searchByName(searchItem).subscribe(output=>{
        loader.dismiss();
        if(output.length>0){
          this.found = true;
          this.contacts  = output;
        }else{
          this.found = false;
        }
      },error=>{
        loader.dismiss();
        this.msgHandler('Error',error);
      })
    }else{
      this.found = false;
    }
    this.searching = false;
  }  

  onCallNumber(phone){
    this.callNumber.callNumber(phone,true);
  }

  msgHandler(title: string, message: string){
    const alert = this
    .alertCtrl
    .create({title: title, message: message, buttons: ['Ok']});
    alert.present();
  }
}
