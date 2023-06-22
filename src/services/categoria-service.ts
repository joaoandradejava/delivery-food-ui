import { CategoriaInput, CategoriaModel } from "@/models/categoria";
import { Page, Pageable } from "@/models/pagination";
import { API } from "./api";

const REQUEST_MAPPING: string = `/categorias`;

export async function buscarTodasCategorias(pageable: Pageable
): Promise<Page<CategoriaModel>> {
    const { size, page } = pageable;

    return API.get(`${REQUEST_MAPPING}?size=${size}&page=${page}&sort=id,desc`).then(response => response.data);
}

export async function buscarCategoriaPorId(id: number, tokenJwt: string): Promise<CategoriaModel> {
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: tokenJwt,
        },
    };
    return API.get(`${REQUEST_MAPPING}/${id}`, config).then(response => response.data)
}

export async function cadastrarCategoria(categoriaInput: CategoriaInput): Promise<CategoriaModel> {
    return API.post(REQUEST_MAPPING, categoriaInput).then(response => response.data);
}

export async function atualizarCategoria(categoriaInput: CategoriaInput, id: number): Promise<CategoriaModel> {
    return API.put(`${REQUEST_MAPPING}/${id}`, categoriaInput).then(response => response.data)
}

export async function deletarCategoriaPorId(id: number): Promise<void> {
    return API.delete(`${REQUEST_MAPPING}/${id}`).then(response => response.data)
}