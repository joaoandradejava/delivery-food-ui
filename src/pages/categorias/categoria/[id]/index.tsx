import MenuTopo from "@/components/MenuTopo";
import Toast from "@/components/Toast";
import Input from "@/components/forms/Input";
import { CategoriaInput, CategoriaModel } from "@/models/categoria";
import { UsuarioAutenticadoModel } from "@/models/usuario";
import { getUsuarioLogadoPassandoContext } from "@/services/auth-service";
import {
  atualizarCategoria,
  buscarCategoriaPorId,
  cadastrarCategoria,
} from "@/services/categoria-service";
import { mostrarMensagemSucesso } from "@/services/toast-service";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_O,
} from "@/utils/constants";
import { isTemAcesso } from "@/utils/guard";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  categoriaModel: CategoriaModel;
}

const schema = z.object({
  nome: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(3, CAMPO_VALOR_MINIMO_O("nome", 3))
    .max(255, CAMPO_VALOR_MAXIMO_O("nome", 255)),
});
export default function Index(props: Props) {
  const { categoriaModel } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: categoriaModel.id,
      nome: categoriaModel.nome,
    },
    resolver: zodResolver(schema),
  });

  function atualizar(data: CategoriaInput) {
    atualizarCategoria(data, categoriaModel.id).then((data) => {
      mostrarMensagemSucesso("Atualizado com sucesso");
    });
  }

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="w-full md:w-4/12  mx-auto flex flex-col pt-0 p-5">
      <span className="text-3xl font-bold text-center">Categoria</span>
        <form
          className="flex flex-col gap-3"
          onSubmit={handleSubmit(atualizar)}
        >
          <div className="w-2/12">
            <Input
              id="id"
              label="Id"
              type="text"
              register={register}
              disabled
            />
          </div>
          <Input
            id="nome"
            required
            label="Nome"
            type="text"
            error={errors.nome}
            register={register}
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
              Salvar
            </button>
          </div>
        </form>
      </div>
      <Toast />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  if (!isTemAcesso(context, true)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const usuarioLogado: UsuarioAutenticadoModel | undefined =
    getUsuarioLogadoPassandoContext(context);
  const tokenJwt: string = usuarioLogado ? usuarioLogado.tokenJwt : "";
  const { id } = context.query;
  const categoriaModel: CategoriaModel = await buscarCategoriaPorId(
    id,
    tokenJwt
  );

  return {
    props: {
      categoriaModel,
    },
  };
}
