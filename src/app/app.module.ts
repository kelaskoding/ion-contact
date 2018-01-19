import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CallNumber } from '@ionic-native/call-number';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ContactService } from '../services/contact.service';
import { HttpModule } from '@angular/http';
import { AddPage } from '../pages/add/add';
import { DetailPage } from '../pages/detail/detail';
import { SearchPage } from '../pages/search/search';
import { EditPage } from '../pages/edit/edit';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    SearchPage,
    EditPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    SearchPage,
    EditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ContactService,
    CallNumber,
    Camera,
    ImagePicker,
    Base64,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
