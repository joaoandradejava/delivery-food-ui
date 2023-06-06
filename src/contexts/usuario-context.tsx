import { LoginDTO, UsuarioAutenticadoModel } from "@/models/usuario";
import {
  getCookieUsuarioLogado,
  salvarCookieUsuarioLogado,
} from "@/services/auth-service";
import { realizarLogin } from "@/services/auth-service";
import { mostrarMensagemError } from "@/services/toast-service";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

interface UsuarioContextType {
  usuarioAutenticado: UsuarioAutenticadoModel | undefined;
  isAutenticado: boolean;
  logarSistema: (loginDTO: LoginDTO) => void;
}

export const UsuarioContext = createContext({} as UsuarioContextType);

export function UsuarioProvider({ children }: any) {
  const router = useRouter();
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<
    UsuarioAutenticadoModel | undefined
  >();
  const [isAutenticado, setIsAutenticado] = useState(!!usuarioAutenticado);

  function logarSistema(loginDTO: LoginDTO) {
    realizarLogin(loginDTO)
      .then((data) => {
        salvarCookieUsuarioLogado(data);
        setIsAutenticado(true);
        setUsuarioAutenticado(data);

        router.push("/");
      })
      .catch((error) => {
        mostrarMensagemError(error.response.data.userMessage);
      });
  }

  useEffect(() => {
    const usuarioAutenticado: UsuarioAutenticadoModel | undefined =
      getCookieUsuarioLogado();
    if (usuarioAutenticado != undefined) {
      setIsAutenticado(true);
      setUsuarioAutenticado(usuarioAutenticado);
    }
  }, []);

  return (
    <UsuarioContext.Provider
      value={{ usuarioAutenticado, logarSistema, isAutenticado }}
    >
      {children}
    </UsuarioContext.Provider>
  );
}
