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
