import { MedicinasService } from './../servicios/medicinas.service';
import { map } from 'rxjs/operators';
import { MedicamentosService } from '../servicios/medicamentos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  medicamentos;

  private selectedItem: any;
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(
    private medicinaService: MedicinasService,
    private router: Router,
    private medicamentoService: MedicamentosService) {

  }


  ngOnInit() {
    this.medicamentos = this.medicamentoService.getMedicamentos().pipe(
      map(tomas => {
        tomas.forEach(toma => {
          console.log(toma);

        });
        ;
        return tomas;

      })
    );
  }
  salir() {
    this.router.navigate(['home']);
  }

}
