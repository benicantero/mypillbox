import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  public selectedIndex = 0;
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
  ngOnInit() {
    const path = window.location.pathname.split('home/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
