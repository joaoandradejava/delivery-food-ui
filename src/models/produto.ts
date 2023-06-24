import { CategoriaIdInput, CategoriaModel } from "./categoria";

export interface ProdutoModel {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  isDisponivel: boolean;
  fotoUrl: string;
}

export interface ProdutoFullModel {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  isDisponivel: boolean;
  fotoUrl: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
  categorias: CategoriaModel[];
}

export interface ProdutoInput {
  nome: string;
  descricao: string;
  preco: number;
  fotoUrl: string;
  categorias: CategoriaIdInput[];
}
