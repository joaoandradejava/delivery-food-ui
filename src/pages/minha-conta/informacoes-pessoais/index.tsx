import MenuTopo from "@/components/MenuTopo";
import Input from "@/components/forms/Input";
import {
  UsuarioAutenticadoModel,
  UsuarioFullModel,
  UsuarioUpdateInput,
} from "@/models/usuario";
import { getUsuarioLogadoPassandoContext } from "@/services/auth-service";
import {
  atualizarUsuario,
  buscarUsuarioPorId,
} from "@/services/usuario-service";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_O,
} from "@/utils/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "@/components/Toast";
import {
  mostrarMensagemError,
  mostrarMensagemSucesso,
} from "@/services/toast-service";
import Link from "next/link";
import { LINK_PAGINA_DADOS_CADASTRAIS } from "@/utils/routes";
import Layout from "@/components/Layout";

interface Props {
  usuarioFullModel: UsuarioFullModel;
}

const schema = z.object({
  nome: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(3, CAMPO_VALOR_MINIMO_O("nome", 3))
    .max(255, CAMPO_VALOR_MAXIMO_O("nome", 255)),
});

export default function Index(props: Props) {
  const { usuarioFullModel } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nome: usuarioFullModel.nome,
    },
    resolver: zodResolver(schema),
  });

  function salvar(data: UsuarioUpdateInput) {
    data.email = usuarioFullModel.email;
    data.telefoneCelular = usuarioFullModel.telefoneCelular;
    atualizarUsuario(usuarioFullModel.id, data)
      .then((data) => {
        mostrarMensagemSucesso("Seus dados foram atualizados com sucesso.");
      })
      .catch((e) => {
        mostrarMensagemError(e.response.data.userMessage);
      });
  }

  return (
    <Layout>
<div className="w-5/12 mx-auto">
        <span className="text-3xl font-bold">Meus dados</span>
        <form
          className="flex flex-col gap-3 mt-3"
          onSubmit={handleSubmit(salvar)}
        >
          <Input
            id="nome"
            label="Nome completo"
            required
            type="text"
            error={errors.nome}
            register={register}
          />

          <div className="flex justify-end gap-3">
            <Link href={LINK_PAGINA_DADOS_CADASTRAIS}>
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
              Salvar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const usuarioLogado: UsuarioAutenticadoModel | undefined =
    getUsuarioLogadoPassandoContext(context);

  if (usuarioLogado) {
    const usuarioFullModel: UsuarioFullModel = await buscarUsuarioPorId(
      usuarioLogado.id,
      usuarioLogado.tokenJwt
    );
    return {
      props: {
        usuarioFullModel: usuarioFullModel,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
