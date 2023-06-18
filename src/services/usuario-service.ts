import { UsuarioCreateInput } from "@/models/usuario";
import { API } from "./api";

const REQUEST_MAPPING: string = `/usuarios`;

export async function cadastrarUsuario(usuarioCreateInput: UsuarioCreateInput) {
  return API.post(REQUEST_MAPPING, usuarioCreateInput).then(
    (data) => data.data
  );
}
