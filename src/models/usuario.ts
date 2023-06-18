export interface UsuarioAutenticadoModel {
  id: number;
  nome: string;
  email: string;
  fotoPerfil: string;
  tokenJwt: string;
  isAdmin: boolean;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface UsuarioFullModel {
  id: number;
  nome: string;
  email: string;
  telefoneCelular: string;
  fotoPerfil: string;
  dataCadastro: Date;
  dataAtualizacao: Date;
}

export interface UsuarioCreateInput {
  nome: string;
  email: string;
  senha: string;
  telefoneCelular: string;
}
