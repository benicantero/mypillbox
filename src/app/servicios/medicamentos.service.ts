import { Medicamento } from '../modelos/medicamento';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  medicamentos = 'medicamentos';

  constructor(private db:AngularFirestore){}

  getMedicamentos(): Observable<Medicamento[]> {
    return this.db.collection<Medicamento>(this.medicamentos).snapshotChanges().pipe(
      map( medicamentos => {
        return medicamentos.map(
          medicamento => {
            const data = medicamento.payload.doc.data();
            const key = medicamento.payload.doc.id;
            return {id: key, ...data};
          }
        );
      })
    );
  }
  
  altaMedicamento(medicamento: Medicamento) {
    return this.db.collection<Medicamento>(this.medicamentos).add(medicamento);
  }

  getMedicamento(id){
    return this.db.collection(this.medicamentos).doc(id).get();
  }

  editMedicamento(medicamento: Medicamento){
    return this.db.collection<Medicamento>(this.medicamentos).doc(medicamento.id).set(medicamento);
  }

  borrarMedicamento(id: string){
    return this.db.collection<Medicamento>(this.medicamentos).doc(id).delete();
  }

}