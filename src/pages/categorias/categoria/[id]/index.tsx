import MenuTopo from "@/components/MenuTopo";
import Toast from "@/components/Toast";
import CreateUpdateCategoriaForm from "@/components/forms/CreateUpdateCategoriaForm";
import { CategoriaInput, CategoriaModel } from "@/models/categoria";
import { UsuarioAutenticadoModel } from "@/models/usuario";
import { getUsuarioLogadoPassandoContext } from "@/services/auth-service";
import {
  atualizarCategoria,
  buscarCategoriaPorId,
} from "@/services/categoria-service";
import {
  mostrarMensagemError,
  mostrarMensagemSucesso,
} from "@/services/toast-service";
import { getUserMessageError } from "@/utils/constants";
import { isTemAcesso } from "@/utils/guard";

interface Props {
  categoriaModel: CategoriaModel;
}

export default function Index(props: Props) {
  const { categoriaModel } = props;

  function atualizar(data: CategoriaInput) {
    atualizarCategoria(data, categoriaModel.id)
      .then((data) => {
        mostrarMensagemSucesso("Atualizado com sucesso");
      })
      .catch((e) => {
        mostrarMensagemError(getUserMessageError(e));
      });
  }

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="w-full md:w-4/12  mx-auto flex flex-col pt-0 p-5">
        <span className="text-3xl font-bold text-center">Categoria</span>
        <CreateUpdateCategoriaForm
          onSalvarOuAtualizar={atualizar}
          categoriaModel={categoriaModel}
        />
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
