import { LoginDTO, UsuarioAutenticadoModel } from "@/models/usuario";
import Cookies from "js-cookie";
import { API } from "./api";
import { parse } from "cookie";

const REQUEST_MAPPING: string = `/login`;
const USUARIO_AUTENTICADO_NAME_COOKIE = "usuario-logado";

export function realizarLogin(
  loginDTO: LoginDTO
): Promise<UsuarioAutenticadoModel> {
  return API.post(REQUEST_MAPPING, loginDTO).then((response) => response.data);
}

export function salvarCookieUsuarioLogado(usuario: UsuarioAutenticadoModel) {
  Cookies.set(USUARIO_AUTENTICADO_NAME_COOKIE, JSON.stringify(usuario));
}

export function getCookieUsuarioLogado(): UsuarioAutenticadoModel | undefined {
  const usuarioLogadoString = Cookies.get(USUARIO_AUTENTICADO_NAME_COOKIE);

  if (usuarioLogadoString) {
    try {
      const usuarioLogado = JSON.parse(usuarioLogadoString);
      return usuarioLogado;
    } catch (error) {
      return undefined;
    }
  }

  return undefined;
}

export function verificarSeUsuarioEstarLogadoPassandoContext(
  context: any
): boolean {
  const cookie = parse(context.req.headers.cookie || "");

  if (cookie != undefined && cookie[USUARIO_AUTENTICADO_NAME_COOKIE]) {
    return true;
  }

  return false;
}

export function getUsuarioLogadoPassandoContext(
  context: any
): UsuarioAutenticadoModel | undefined {
  const cookie = parse(context.req.headers.cookie || "");

  if (cookie != undefined && cookie[USUARIO_AUTENTICADO_NAME_COOKIE]) {
    const usuarioLogadoString = cookie[USUARIO_AUTENTICADO_NAME_COOKIE];
    try {
      const usuarioLogado = JSON.parse(usuarioLogadoString);
      return usuarioLogado;
    } catch (error) {
      return undefined;
    }
  }

  return undefined;
}
