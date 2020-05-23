import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { MedicinasService } from './../servicios/medicinas.service';
import { Medicina } from './../modelos/medicina';
import { Medicamento } from '../modelos/medicamento';
import { MedicamentosService } from '../servicios/medicamentos.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  medicamentos: Observable<Medicina[]>;
  foto: string;

  medicamentoForm = new FormGroup(
    {
      medicina: new FormControl(null, [Validators.required]),
      cantidad: new FormControl(1, [Validators.required]),
      tomas: new FormControl(1, [Validators.required])
    }
  );

  constructor(
    public afSG: AngularFireStorage,
    private medicinaService: MedicinasService,
    private router: Router,
    private medicamentoFirestore: MedicamentosService) {
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
    this.medicamentos = this.medicinaService.getMedicinas();
  }

  nuevoMedicamento() {
    let medicamento: Medicamento = {
      medicinaId: this.medicamentoForm.get("medicina").value,
      cantidad: this.medicamentoForm.get("cantidad").value,
      tomas: this.medicamentoForm.get("tomas").value
    };

    this.medicamentoFirestore.altaMedicamento(medicamento).then(
      () => this.router.navigate(['list'])
    );
  }
  salir() { this.router.navigate(['list']); }
}
