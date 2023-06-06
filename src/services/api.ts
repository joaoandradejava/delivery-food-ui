import { BASE_API } from "@/utils/constants";
import axios from "axios";
import { getCookieUsuarioLogado } from "./auth-service";

export const API = axios.create({
  baseURL: BASE_API,
});

API.interceptors.request.use((config) => {
  const  usuarioAutenticado  = getCookieUsuarioLogado()

  if (usuarioAutenticado != undefined) {
    const token: string = `Bearer ${usuarioAutenticado.tokenJwt}`;

    config.headers.Authorizationd = token;
  }

  return config;
});
