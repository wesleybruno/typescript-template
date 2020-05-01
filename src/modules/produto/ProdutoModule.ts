import { Application } from 'express'
import {
    Db
} from 'mongodb';

import ProdutoRouter from './ProdutoRouter'
import ProdutoController from './ProdutoController'
import ProdutoRepository from './ProdutoRepository'

class ProdutoModule {

    static configure(app: Application, db: Db) {
        app.use('/produto', ProdutoRouter.getRoutes(new ProdutoController(db)));
        ProdutoRepository.configure(db)
    }

}

export default ProdutoModule