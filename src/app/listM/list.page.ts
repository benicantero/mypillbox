import { map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { MedicinasService } from './../servicios/medicinas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  medicinas;

  private selectedItem: any;

  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private router: Router,
    private medicinaService: MedicinasService,
    public afSG: AngularFireStorage
  ) {
    console.log('Entra en listado');
  }

  ngOnInit() {
    this.medicinas = this.medicinaService.getMedicinas().pipe(
      map(medicinas => {
        console.log(medicinas);
        medicinas.forEach(medicina => {
          console.log(medicina);
          this.afSG.ref(medicina.foto).getDownloadURL().subscribe(
            url => {
              medicina.path = url;
              console.log(url);
            }
          );
        });
        return medicinas;
      })
    );
  }

  salir() {
    this.router.navigate(['home']);
  }

}
