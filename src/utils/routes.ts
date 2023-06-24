export const LINK_PAGINA_INICIAL = "/";
export const LINK_PAGINA_LOGIN = "/login";
export const LINK_PAGINA_CADASTRO = "/cadastro";
export const LINK_PAGINA_DADOS_CADASTRAIS = "/minha-conta/dados-cadastrais";
export const LINK_INFORMACOES_PESSOAIS = "/minha-conta/informacoes-pessoais";
export const LINK_DADOS_CONTATO = "/minha-conta/dados-contato";
export const LINK_MUDAR_CREDENCIAIS = "/minha-conta/credenciais";
export const LINK_LISTA_CATEGORIAS_ADMIN = "/admin/categorias";
export const LINK_LISTA_PRODUTOS_ADMIN = "/admin/produtos";
export const LINK_NOVA_CATEGORIA_ADMIN = "/admin/categorias/categoria";
export const LINK_EDITAR_CATEGORIA_ADMIN = (id: number) =>
  `/admin/categorias/categoria/${id}`;
export const LINK_NOVO_PRODUTO_ADMIN = "/admin/produtos/produto";
export const LINK_EDITAR_PRODUTO_ADMIN = (id: string) =>
  `/admin/produtos/produto/${id}`;
