import { Medicina } from '../modelos/medicina';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicinasService {

  medicinas = 'medicinas';

  constructor(private db: AngularFirestore) { }

  getMedicinas(): Observable<Medicina[]> {
    return this.db.collection<Medicina>(this.medicinas).snapshotChanges().pipe(
      map( medicinas => {
        return medicinas.map(
          medicina => {
            const data = medicina.payload.doc.data();
            const key = medicina.payload.doc.id;
            return {id: key, ...data};
          }
        );
      })
    );
  }
  altaMedicina(medicina: Medicina) {
    return this.db.collection<Medicina>(this.medicinas).add(medicina);
  }

  getMedicina(id){
    return this.db.collection(this.medicinas).doc(id).get();
  }

  editMedicina(medicina: Medicina){
    return this.db.collection<Medicina>(this.medicinas).doc(medicina.id).set(medicina);
  }

  borrarMedicina(medicina: Medicina){
    return this.db.collection<Medicina>(this.medicinas).doc(medicina.id).delete();
  }

  

}
