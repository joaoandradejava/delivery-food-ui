import { ProdutoFilter } from "@/models/filters/produto-filter";
import { Page, Pageable } from "@/models/pagination";
import { ProdutoFullModel, ProdutoModel } from "@/models/produto";
import { BASE_API } from "@/utils/constants";

const REQUEST_MAPPING: string = `${BASE_API}/produtos`;

export async function buscarTodosProdutos(
  pageable: Pageable,
  produtoFilter?: ProdutoFilter
): Promise<Page<ProdutoModel>> {
  const { page, size } = pageable;

  return fetch(
    `${REQUEST_MAPPING}?page=${page}&size=${size}&nome=${
      produtoFilter && produtoFilter.nome ? produtoFilter.nome : ""
    }`,
    {
      method: "GET",
    }
  ).then((response) => response.json());
}

export async function buscarProdutoPorId(
  id: string
): Promise<ProdutoFullModel> {
  return fetch(`${REQUEST_MAPPING}/${id}`).then((data) => data.json());
}
