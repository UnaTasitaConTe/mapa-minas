import { MongoClient, Db, Collection } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

class MongoDB {
    private client: MongoClient;
    private dbName: string;
    public db?: Db;

    constructor() {
        const url = process.env.MONGODBURL || 'mongodb://localhost:27017';
        this.dbName = process.env.MONGODBNAME || 'miBaseDeDatos';
        this.client = new MongoClient(url);
    }

    async connect(): Promise<void> {
        try {
            await this.client.connect();
            // console.log('Conectado a la base de datos');
            this.db = this.client.db(this.dbName);
        } catch (error) {
            console.error('Error de conexión:', error);
        }
    }

    async close(): Promise<void> {
        try {
            await this.client.close();
            // console.log('Conexión cerrada');
        } catch (error) {
            console.error('Error al cerrar la conexión:', error);
        }
    }

    async findDocuments(collectionName: string, query: object = {}): Promise<Document[]> {
        if (!this.db) {
            throw new Error('No está conectado a la base de datos');
        }

        const collection: Collection<Document> = this.db.collection(collectionName);
        try {
            const documents: Document[] = await collection.find(query).toArray();
            return documents; // Retorna los documentos encontrados
        } catch (error) {
            console.error('Error al consultar documentos:', error);
            throw error; // Propaga el error para que el llamador pueda manejarlo
        }
    }
}

export default MongoDB;

