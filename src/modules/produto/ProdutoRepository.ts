import Produto from './ProdutoModel'

import {
    Db,
    Collection
} from 'mongodb';
import { collections } from '../../data/MongoDb'

let ProdutoDb: Collection
class ProdutoRepository  {

    static configure(db: Db) {
        ProdutoDb = db.collection(collections.produto);
    }

    static async save(Produto: Produto): Promise<any> {
        try {
            const result = await ProdutoDb.insertOne(
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

    static async getAll(limit: number, offset: number): Promise<Produto[]> {
        try {
            const results = await ProdutoDb.aggregate([
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