import { Router } from 'express'
import ProdutoController from './ProdutoController'
import { validate } from 'express-validation'

class ProdutoRouter {

    static getRoutes(controller: ProdutoController): Router {

        const routes = Router();

        // Docummentation.getById()

        // routes.get(`/search`,
        //     validate(controller.get.schema),
        //     controller.getProduto.fn)

        routes.post('/create',
            validate(controller.create.schema),
            controller.create.fn)

        return routes

    }


}

export default ProdutoRouter;