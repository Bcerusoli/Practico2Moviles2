import { DbService } from "../services/db.service";

export class NotasBLL {
    // selecciona todas las notas
    public async seleccionarTodas(dbService: DbService): Promise<any[]> {
        console.log('seleccionarTodas llamado');
        const database = await dbService.getDatabase();
        const consulta = 'SELECT * FROM notes';
        
        try {
            const res = await database.executeSql(consulta, []);
            const notas = [];
            for (let i = 0; i < res.rows.length; i++) {
                notas.push(res.rows.item(i));
            }
            console.log('seleccionarTodas devolviendo notas:', notas);
            return notas;
        } catch (error) {
            console.error('Error ejecutando seleccionarTodas:', error);
            return [];
        }
    }

    // Método para insertar una nueva nota
    public async insertarNota(dbService: DbService, nota: any): Promise<any> {
        const database = await dbService.getDatabase();
        const consulta = 'INSERT INTO notes (content, color) VALUES (?, ?)';
        const parametros = [nota.content, nota.color];
        
        try {
            const res = await database.executeSql(consulta, parametros);
            console.log('Nota insertada con ID:', res.insertId);
            return { id: res.insertId, content: nota.content, color: nota.color };
        } catch (error) {
            console.error('Error insertando nota:', error);
            throw error;
        }
    }

    // Método para seleccionar una nota por ID
    public async seleccionarPorId(dbService: DbService, id: string): Promise<any> {
        const database = await dbService.getDatabase();
        const consulta = 'SELECT * FROM notes WHERE id = ?';
        
        try {
            const res = await database.executeSql(consulta, [id]);
            console.log('Nota seleccionada por id:', res.rows.item(0));
            return res.rows.item(0);
        } catch (error) {
            console.error('Error seleccionando nota por id:', error);
            throw error;
        }
    }

    // Método para actualizar una nota existente
    public async actualizarNota(dbService: DbService, nota: any): Promise<void> {
        const database = await dbService.getDatabase();
        const consulta = 'UPDATE notes SET content = ?, color = ? WHERE id = ?';
        const parametros = [nota.content, nota.color, nota.id];
        
        try {
            await database.executeSql(consulta, parametros);
            console.log('Nota actualizada');
        } catch (error) {
            console.error('Error actualizando nota:', error);
            throw error;
        }
    }

    // Método para eliminar una nota por su ID
    public async eliminarNotaPorId(dbService: DbService, id: string): Promise<void> {
        const database = await dbService.getDatabase();
        const consulta = 'DELETE FROM notes WHERE id = ?';
        
        try {
            await database.executeSql(consulta, [id]);
            console.log('Nota eliminada');
        } catch (error) {
            console.error('Error eliminando nota por id:', error);
            throw error;
        }
    }
}
