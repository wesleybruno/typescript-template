import express, { Request, Response, NextFunction, Application } from 'express'
import ExpressValidator from 'express-validation';

import helmet from 'helmet'
import cors from 'cors'

import ProdutoModule from './modules/orcamento/produto/ProdutoModule'

import HelperRepository from './helpers/HelperRepository'

import signale from 'signale'
import bodyParser from 'body-parser'
import MongoDb from './data/MongoDb'
import pjson from './../package.json'

import { ValidationError } from 'express-validation'
import {
    Db
} from 'mongodb';

//import ExpressValidator from 'express-validation';
export default class Server {

    app: Application;
    //MongoInstance: Db;

    constructor() {
        this.app = express();
    }

    async _configureDatabase(): Promise<any> {

        const mongoDb = await MongoDb.getDb()
        signale.success('DataBase')
        // Não configurar os indexes e collections toda vez que iniciar o app
        //MongoDbConfig(mongoDb)
        return mongoDb
    }

    _configureMiddleware(): void {
        this.app.use(cors());
        this.app.use(helmet());
        //this.app.use(morgan('dev'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        this.app.get('/server-status', (_, res) => {
            res.send(pjson.version)
        })

    
        signale.success('Midlewares')
    }

    _configureErrorRouter(): void {

        this.app.use(function (err: any, req: Request, resp: Response, next: NextFunction) {
            if (err instanceof ValidationError) {
                resp.locals.localResponse = err
                return resp.status(400).json(err);
            }

            if (err instanceof ExpressValidator.ValidationError) { 
                resp.locals.localResponse = err
                return resp.status(400).json(err);
            }

            if (err) { 
                resp.locals.localResponse = err
                return resp.status(500).json(err)
            }
            
        })

        this.app.use((err: any, req: Request, resp: Response, next: NextFunction) => {
            resp.status(404);

            return resp.send({
                r: false,
                errors: ['404 - Not Found']
            });
        });

    }

    _configureServices(db: Db): void {
        //ProdutoRepository.configure(db)
        HelperRepository.configure(db);
        signale.success('Services')
    }

    _configureModules(db: Db): void {
        ProdutoModule.configure(this.app, db);
        signale.success('Modules')
    }


    async setupApp(): Promise<any> {
        const db = await this._configureDatabase();
        this._configureMiddleware();
        //this._configureRoutes();
        this._configureServices(db);
        this._configureModules(db);
        this._configureErrorRouter();
        return this.app;
    }

}
