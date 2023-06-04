import { LoginDTO, UsuarioAutenticadoModel } from "@/models/usuario";
import { BASE_API } from "@/utils/constants";
import { data } from "autoprefixer";
import axios from "axios";

const REQUEST_MAPPING: string = `${BASE_API}/login`;

export function realizarLogin(
  loginDTO: LoginDTO
): Promise<UsuarioAutenticadoModel> {
  return axios.post(REQUEST_MAPPING, loginDTO).then(response => response.data);
}


