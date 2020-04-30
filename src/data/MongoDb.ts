// @flow

import {
    Db,
    MongoClient
} from 'mongodb';
import signale from 'signale'

let dbInstance: Db;

class MongoDb {

    constructor() { }
    
    async connect(): Promise<any> {
        signale.info('conectando ao MongoDb...');
        const mongodbUrl = process.env.MONGODB_URL || 'ENV VAR MONGODB_URL IS NOT DEFINED';
        signale.info('MONGODB_URL: ' + mongodbUrl);

        const mongoClient = await MongoClient.connect(mongodbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        signale.info(`MONGODB_DATABASE ${process.env.MONGODB_DATABASE || 'UNDEFINED'}`)
        const Db = mongoClient.db(process.env.MONGODB_DATABASE)


        signale.info('conectado ao mongoDb');

        Db.on('error', (error: any) => {
            signale.error(error);
        });

        return Db;
    }

    static async getDb(): Promise<any> {
        if (dbInstance) {
            return dbInstance;
        } else {
            const db = await new MongoDb().connect();
            dbInstance = db;
            return db;
        }
    }
}

export const collections = {
    produto: "produto",
    pedido: "pedido",
    usuario: "usuario",
    loja: "loja"
};

export default MongoDb;