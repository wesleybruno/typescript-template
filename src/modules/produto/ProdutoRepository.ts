import Produto from './ProdutoModel'
import { IRepository } from '../../common/interfaces/IRepository'

import {
    Db,
    Collection
} from 'mongodb';
import { collections } from '../../data/MongoDb'

class ProdutoRepository implements IRepository<Produto> {
    
    private ProdutoDb: Collection
    
    constructor(db: Db) {
        this.ProdutoDb = db.collection(collections.produto);
    }

    async save(Produto: Produto): Promise<any> {
        try {
            const result = await this.ProdutoDb.insertOne(
                {
                    ...Produto
                }
            );
            if (result.result.ok)
                return true

            return false
        } catch (ex) {
            return ex
        }
    }

    async getAll(limit: number, offset: number): Promise<Produto[]> {
        try {
            const results = await this.ProdutoDb.aggregate([
                {
                    $match: {}
                },
                {
                    $skip: offset
                },
                {
                    $limit: limit
                }
            ]).toArray();

            const listaProdutos: Produto[] = []

            results.map(result => {
                listaProdutos.push(Produto.fromObj(result))
            })

            return listaProdutos
        } catch (ex) {
            return ex
        }
    }

}

export default ProdutoRepository