
import { IProduto } from './interfaces/IProduto'
import ProdutoRepository from './ProdutoRepository'
import moment from 'moment'
import BaseModel from '../../common/BaseModel'

class Produto extends BaseModel implements IProduto {

    nome: string;
    descricao: string;
    unidadeMedida: string
    createdAt: Date

    constructor(nome: string, descricao: string, unidadeMedida: string, createdAt: Date) {
        super()
        this.nome = nome;
        this.descricao = descricao
        this.unidadeMedida = unidadeMedida
        this.createdAt = createdAt
    }

    async save(): Promise<any> {
        return await ProdutoRepository.save(this)
    }

    async getAll(limit: number, offset: number): Promise<any> {
        return await ProdutoRepository.getAll(limit, offset)
    }

    static fromObj(obj: Record<string, string>): Produto {
        return new Produto(obj["nome"], obj["descricao"], obj["unidadeMedida"], moment(obj["createdAt"]).toDate());
    }

}

export default Produto