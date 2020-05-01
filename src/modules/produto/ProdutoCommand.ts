import BaseCommand from './../../common/BaseCommand'
import Produto from './ProdutoModel';
import { Db } from 'mongodb';
import moment from 'moment'

class ProdutoCommnad extends BaseCommand {

    db: Db

    constructor(db: Db) {
        super();
        this.db = db;
    }

    async saveProduto(nome: string, descricao: string, unidadeMedida: string): Promise<any> {
        try {

            const produto = new Produto(nome, descricao, unidadeMedida, moment().toDate());
            const result = await produto.save()

            if (!result) {
                this.addArrayError(result.errors)
            }

            return produto

        } catch (ex) {
            return this.handleException(ex)
        }
    }


}

export default ProdutoCommnad