import { AngularFireStorage } from '@angular/fire/storage';
import { MedicinasService } from './../servicios/medicinas.service';
import { Observable } from 'rxjs';
import { Medicina } from './../modelos/medicina';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MedicamentosService } from '../servicios/medicamentos.service';
import { Component, OnInit } from '@angular/core';
import { Medicamento } from '../modelos/medicamento';
import { ActivatedRoute, Router } from '@angular/router';
import { firestore } from 'firebase';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  foto: string;
  medicamentos: Observable < Medicina[] >;

  medicamentoForm = new FormGroup(
    {medicina: new FormControl(null,[Validators.required]),
    cantidad:new FormControl(1,[Validators.required]),
    tomas: new FormControl(1,[Validators.required])}
  );

  id;
  constructor(
    private afSG: AngularFireStorage,
    private medicinaService: MedicinasService,
    private medicamentoFirestore : MedicamentosService,
    private route: ActivatedRoute,
    private router: Router,
    private service: MedicamentosService) {
      this.medicamentoForm.get("medicina").valueChanges.subscribe(
        (medicinaid) => {
          console.log(medicinaid);
          this.medicinaService.getMedicina(medicinaid).subscribe(
            medicina => {
              console.log(medicina.data());
              this.afSG.ref(medicina.data().foto).getDownloadURL().subscribe(
                url => {
                  this.foto = url;
                  console.log(url);
                }
              );
            }
          )
        }
      )
     }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getMedicamento(this.id).subscribe(
      (medicamento) => {
        this.medicamentoForm.get("medicina").setValue(medicamento.get("medicinaId")),
        this.medicamentoForm.get("cantidad").setValue(medicamento.get("cantidad")),
        this.medicamentoForm.get("tomas").setValue(medicamento.get("tomas"));
      
      }
    );
  }

  modificarMedicamento() {
    let medicamento: Medicamento = {
        medicinaId : this.medicamentoForm.get("medicina").value,
        cantidad : this.medicamentoForm.get("cantidad").value,
        tomas: this.medicamentoForm.get("tomas").value
      };
  
    this.medicamentoFirestore.altaMedicamento(medicamento).then(
        () => this.router.navigate(['list'])
  );
    }
 
 borrarMedicamento() {
  this.service.borrarMedicamento(this.id).then(
    () => {this.router.navigateByUrl('list');
  }
  );
}

}
