
import { IProduto } from './interfaces/IProduto'
import ProdutoRepository from './ProdutoRepository'
import moment from 'moment'
import BaseModel from '../../common/BaseModel'

class Produto extends BaseModel implements IProduto {


    nome: string;
    descricao: string;
    unidadeMedida: string
    createdAt: Date

    repository: ProdutoRepository

    constructor(nome: string, descricao: string, unidadeMedida: string, createdAt: Date, repository?: ProdutoRepository) {
        super()
        this.nome = nome;
        this.descricao = descricao
        this.unidadeMedida = unidadeMedida
        this.createdAt = createdAt
        this.repository = repository
    }

    async save(): Promise<Produto> {
        delete this.repository
        return await this.repository.save(this)
    }

    async getAll(limit: number, offset: number): Promise<Produto[]> {
        return await this.repository.getAll(limit, offset)
    }

    static fromObj(obj: Record<string, string>): Produto {
        return new Produto(obj["nome"], obj["descricao"], obj["unidadeMedida"], moment(obj["createdAt"]).toDate());
    }

}

export default Produto