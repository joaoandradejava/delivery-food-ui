import { MudancaSenhaInput } from "./../models/usuario";
import { UsuarioCreateInput, UsuarioUpdateInput } from "@/models/usuario";
import { API } from "./api";

const REQUEST_MAPPING: string = `/usuarios`;

export async function cadastrarUsuario(usuarioCreateInput: UsuarioCreateInput) {
  return API.post(REQUEST_MAPPING, usuarioCreateInput).then(
    (response) => response.data
  );
}

export async function buscarUsuarioPorId(id: number, tokenJwt: string) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenJwt,
    },
  };
  return API.get(`${REQUEST_MAPPING}/${id}`, config).then(
    (response) => response.data
  );
}

export async function atualizarUsuario(
  id: number,
  usuarioUpdateInput: UsuarioUpdateInput
) {
  console.log(id);
  return API.put(`${REQUEST_MAPPING}/${id}`, usuarioUpdateInput).then(
    (response) => response.data
  );
}

export async function mudarSenhaDoUsuario(
  mudancaSenhaInput: MudancaSenhaInput
): Promise<void> {
  return API.put(`${REQUEST_MAPPING}/senha`, mudancaSenhaInput).then((response) => response.data);
}
