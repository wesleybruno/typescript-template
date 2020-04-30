
import Produto from '../ProdutoModel'

export interface IProduto {
    nome: string,
    descricao: string,
    unidadeMedida: string,
    createdAt: Date
    
    save(): Promise<Produto>,
  
}