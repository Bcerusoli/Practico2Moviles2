import { Component } from '@angular/core';
import { NotasBLL } from '../bll/notas-bll';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notasBLL: NotasBLL = new NotasBLL();
  notas: any[] = [];

  constructor(private dbService: DbService) {
    console.log('Constructor de HomePage llamado');
    this.cargarNotas();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter llamado');
    this.cargarNotas();
  }

  cargarNotas() {
    console.log('cargarNotas llamado');
    this.notasBLL.seleccionarTodas(this.dbService)
      .then((data) => {
        console.log('seleccionarTodas resuelto con datos:', data);
        if (Array.isArray(data)) {
          this.notas = data;
          console.log('Notas cargadas:', this.notas);
        } else {
          console.error('Los datos no son un array:', data);
        }
      })
      .catch((error) => {
        console.error('Error al cargar notas:', error);
      });
  }
}