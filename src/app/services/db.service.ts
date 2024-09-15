import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private databaseReady: Promise<SQLiteObject>;
  
  constructor(private sqlite: SQLite, private platform: Platform) {
    console.log('inicializando la base de datos');
    this.databaseReady = this.platform.ready().then(() => this.createdb());
  }

  private async createdb(): Promise<SQLiteObject> {
    console.log('Se crea la base de datos');
    try {
      const db = await this.sqlite.create({
        name: 'BrunNotas',
        location: 'default'
      });
      console.log('Se pudo crear la base de datos', db);
      await this.createTable(db);
      return db;
    } catch (error) {
      console.error('No se a creado la base de datos', error);
      throw error;
    }
  }

  private async createTable(db: SQLiteObject): Promise<void> {
    console.log('se crea la tabla');
    const sqlCreateTable = 'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, content TEXT, color TEXT)';
    try {
      await db.executeSql(sqlCreateTable, []);
      console.log('se pudo crear con eito la tabla');
    } catch (error) {
      console.error('No se creo la tabla', error);
      throw error;
    }
  }

  // Método público que devuelve la promesa de la base de datos lista
  public getDatabase(): Promise<SQLiteObject> {
    return this.databaseReady;
  }
}
