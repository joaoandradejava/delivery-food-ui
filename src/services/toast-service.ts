import { toast } from "react-toastify";

export function mostrarMensagemSucesso(mensagem: string) {
  toast.success(mensagem);
}

export function mostrarMensagemError(mensagem: string) {
  toast.error(mensagem);
}
