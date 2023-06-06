import { ProdutoFilter } from "@/models/filters/produto-filter";
import { Page, Pageable } from "@/models/pagination";
import { ProdutoFullModel, ProdutoModel } from "@/models/produto";
import { API } from "./api";

const REQUEST_MAPPING: string = `/produtos`;

export async function buscarTodosProdutos(
  pageable: Pageable,
  produtoFilter?: ProdutoFilter
): Promise<Page<ProdutoModel>> {
  const { page, size } = pageable;

  return API.get(
    `${REQUEST_MAPPING}?page=${page}&size=${size}&nome=${
      produtoFilter && produtoFilter.nome ? produtoFilter.nome : ""
    }`
  ).then((response) => response.data);
}

export async function buscarProdutoPorId(
  id: string
): Promise<ProdutoFullModel> {
  return API.get(`${REQUEST_MAPPING}/${id}`).then((response) => response.data);
}
