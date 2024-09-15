import { Component, OnInit } from '@angular/core';
import { NotasBLL } from '../bll/notas-bll';
import { DbService } from '../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.page.html',
  styleUrls: ['./nota.page.scss'],
})
export class NotaPage implements OnInit {
  notaAgregada = { id: null, content: '', color: 'white' };

  constructor(
    private notasBLL: NotasBLL,
    private dbService: DbService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarNotaSiExiste();
  }

  private async cargarNotaSiExiste(): Promise<void> {
    const notaId = this.route.snapshot.paramMap.get('id');
    if (notaId) {
      await this.cargarNotaPorId(notaId);
    }
  }

  private async cargarNotaPorId(id: string): Promise<void> {
    try {
      this.notaAgregada = await this.notasBLL.seleccionarPorId(this.dbService, id);
    } catch (error) {
      console.error('Error al cargar la nota:', error);
    }
  }

  async guardarNota(): Promise<void> {
    try {
      if (this.notaAgregada.id) {
        await this.actualizarNota();
      } else {
        await this.crearNota();
      }
    } catch (error) {
      console.error('Error al guardar la nota:', error);
    }
  }

  private async crearNota(): Promise<void> {
    try {
      console.log('Insertando nota:', this.notaAgregada);
      await this.notasBLL.insertarNota(this.dbService, this.notaAgregada);
      console.log('Nota insertada con éxito');
      this.navegarAInicio();
    } catch (error) {
      console.error('Error al insertar nota:', error);
    }
  }

  private async actualizarNota(): Promise<void> {
    try {
      await this.notasBLL.actualizarNota(this.dbService, this.notaAgregada);
      console.log('Nota actualizada con éxito');
      this.navegarAInicio();
    } catch (error) {
      console.error('Error al actualizar nota:', error);
    }
  }

  async eliminarNota(): Promise<void> {
    if (this.notaAgregada.id !== null) {
      try {
        await this.notasBLL.eliminarNotaPorId(this.dbService, this.notaAgregada.id);
        console.log('Nota eliminada con éxito');
        this.navegarAInicio();
      } catch (error) {
        console.error('Error al eliminar la nota:', error);
      }
    } else {
      console.error('Error: El ID de la nota es nulo');
    }
  }

  navegarAInicio(): void {
    this.router.navigate(['/home']);
  }
}