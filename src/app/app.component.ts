import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'INICIO',
      url: '/home',
      icon: 'home'
    },
    {
      title:'VER MIS MEDICINAS',
      url:'/listM',
      icon:'list'
    },
    {
      title: 'VER MIS TOMAS',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'AÑADIR MEDICINA',
      url:'/createM',
      icon:'add'
    },
    {
      title: 'AÑADIR TOMA',
      url: '/create',
      icon: 'add'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
