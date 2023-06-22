import MenuTopo from "@/components/MenuTopo";
import { isTemAcesso } from "@/utils/guard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Toast from "@/components/Toast";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_A,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_A,
  CAMPO_VALOR_MINIMO_O,
} from "@/utils/constants";
import Input from "@/components/forms/Input";
import Link from "next/link";
import { mudarSenhaDoUsuario } from "@/services/usuario-service";
import { MudancaSenhaInput } from "@/models/usuario";
import {
  mostrarMensagemError,
  mostrarMensagemSucesso,
} from "@/services/toast-service";
const schema = z.object({
  senhaAtual: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(6, CAMPO_VALOR_MINIMO_A("senha atual", 6))
    .max(255, CAMPO_VALOR_MAXIMO_A("senha tual", 255)),
  novaSenha: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(6, CAMPO_VALOR_MINIMO_A("Nova senha", 6))
    .max(255, CAMPO_VALOR_MAXIMO_A("Nova senha", 255)),
  confirmacaoNovaSenha: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(6, CAMPO_VALOR_MINIMO_A("Confirmação nova senha", 6))
    .max(255, CAMPO_VALOR_MAXIMO_A("Confirmação nova senha", 255)),
});
export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  function mudarSenha(data: MudancaSenhaInput) {
    mudarSenhaDoUsuario(data)
      .then((data) => {
        mostrarMensagemSucesso("Senha atualizada com sucesso.");
      })
      .catch((e) => {
        mostrarMensagemError(e.response.data.userMessage);
      });
  }

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="w-full md:w-4/12  mx-auto flex flex-col pt-0 p-5">
        <span className="text-2xl font-bold">Mude sua senha</span>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(mudarSenha)}
        >
          <Input
            id="senhaAtual"
            label="Senha atual"
            type="password"
            required
            register={register}
            error={errors.senhaAtual}
          />
          <Input
            id="novaSenha"
            label="Nova senha"
            type="password"
            required
            register={register}
            error={errors.novaSenha}
          />
          <Input
            id="confirmacaoNovaSenha"
            label="Confirmação nova senha"
            type="password"
            required
            register={register}
            error={errors.confirmacaoNovaSenha}
          />
          <div className="flex justify-end gap-3">
            <Link href="../">
              <button
                type="button"
                className="bg-white text-black font-bold p-2 w-20 rounded-xl hover:bg-slate-50 shadow-xl"
              >
                Voltar
              </button>
            </Link>

            <button
              type="submit"
              className="bg-red-600 text-white font-bold p-2 w-20 rounded-xl hover:bg-red-800 shadow-xl"
            >
              Mudar senha
            </button>
          </div>
        </form>
      </div>
      <Toast />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  if (!isTemAcesso(context), false) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
