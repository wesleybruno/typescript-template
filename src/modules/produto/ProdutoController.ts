import { Request, Response } from 'express'
import BaseController, { ControllerMethodType } from '../../common/BaseController';
import {
    Db,
} from 'mongodb';

import { Joi } from 'express-validation'
import Produto from './ProdutoModel';
import moment from 'moment'
import ProdutoRepository from './ProdutoRepository';

class ProdutoController extends BaseController {

    db: Db;
    repository: ProdutoRepository

    constructor(db: Db) {
        super();
        this.db = db;
        this.repository = new ProdutoRepository(this.db)
    }

    get create(): ControllerMethodType {
        return {
            schema: {
                body: Joi.object({
                    nome: Joi.string().required().min(3).trim(),
                    descricao: Joi.string().required(),
                    unidadeMedida: Joi.string().required(),
                })
            },
            fn: async (req: Request, res: Response): Promise<any> => {
                try {

                    const {
                        nome,
                        descricao,
                        unidadeMedida
                    } = req.body
                    
                    const produto = new Produto(nome, descricao, unidadeMedida, moment().toDate(), this.repository);
                    produto.save()
                    
                    if (!produto.isValid()) {
                        return this.Fail(res, produto.errors)
                    }
                    
                    return this.Ok(res, produto.toObj)
                } catch (ex) {
                    return this.BadRequest(res, ex)
                }
            }
        }
    }

    // get getProduto(): ControllerMethodType {
    //     return {
    //         schema: {
    //             query: Joi.object({
    //                 placeId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    //                 produtoId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
    //                 codigoBarras: Joi.string(),
    //                 codigoInterno: Joi.string()
    //             })
    //         },
    //         fn: async (req: Request, res: Response): Promise<any> => {
    //             try {
    //                 const { placeId, produtoId, codigoBarras, codigoInterno } = req.query

    //                 const { clientAccess } = res.locals

    //                 const commnand = new ProdutoCommnad(this.db);
    //                 const result = await commnand.getProduto(clientAccess.id, placeId as string, produtoId as string, codigoBarras as string, codigoInterno as string);

    //                 if (commnand.isValid()) {
    //                     return this.Ok(res, result)
    //                 }

    //                 return this.Fail(res, result, commnand.errors)
    //             } catch (ex) {
    //                 return this.BadRequest(res, ex)
    //             }
    //         }
    //     }
    // }

}

export default ProdutoController