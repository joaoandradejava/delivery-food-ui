import { UsuarioAutenticadoModel } from "@/models/usuario";
import { getUsuarioLogadoPassandoContext } from "@/services/auth-service";

export function isTemAcesso(context: any, isTemQueTerAcessoDeAdministrador?: boolean) {
    const usuarioLogado: UsuarioAutenticadoModel | undefined =
        getUsuarioLogadoPassandoContext(context);

    if (!usuarioLogado || usuarioLogado.isAdmin !== isTemQueTerAcessoDeAdministrador) {
        return false
    }

    return true
}