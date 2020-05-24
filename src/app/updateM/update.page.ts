import { MedicinasService } from './../servicios/medicinas.service';
import { Component, OnInit } from '@angular/core';
import { Medicina } from '../modelos/medicina';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  medicina: Medicina = {nombre: '', foto: null, path: ''};

  id;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: MedicinasService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getMedicina(this.id).subscribe(
      (medicina) => {
        this.medicina.nombre = medicina.get('nombre');
        this.medicina.foto = medicina.get('foto');
      }
    );
  }

 modificarMedicina() {
    let medi: Medicina = {
              id: this.id,
              nombre: this.medicina.nombre,
              path: this.medicina.path,
              foto: this.medicina.foto};
    this.service.editMedicina(medi).then(
        () => {this.router.navigateByUrl('/listM');
      }
    );
 }

 borrarMedicina() {
   this.medicina.id = this.id;
   this.service.borrarMedicina(this.medicina).then(
     () => {this.router.navigateByUrl('listM');
   }
   );
 }

 salir() {
  this.router.navigate(['home']);
}

 }
