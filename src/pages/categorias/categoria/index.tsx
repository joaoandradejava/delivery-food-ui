import MenuTopo from "@/components/MenuTopo";
import Toast from "@/components/Toast";
import CreateUpdateCategoriaForm from "@/components/forms/CreateUpdateCategoriaForm";
import { CategoriaInput } from "@/models/categoria";
import { cadastrarCategoria } from "@/services/categoria-service";
import {
  mostrarMensagemError,
  mostrarMensagemSucesso,
} from "@/services/toast-service";
import { getUserMessageError } from "@/utils/constants";
import { isTemAcesso } from "@/utils/guard";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  function salvar(data: CategoriaInput) {
    cadastrarCategoria(data)
      .then((data) => {
        mostrarMensagemSucesso("Cadastro realizado com sucesso");
        router.push(`categoria/${data.id}`);
      })
      .catch((e) => {
        mostrarMensagemError(getUserMessageError(e));
      });
  }

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="w-full md:w-4/12  mx-auto flex flex-col pt-3 p-5 bg-white shadow-xl rounded">
        <span className="text-3xl font-medium text-center">Categoria</span>
        <CreateUpdateCategoriaForm onSalvarOuAtualizar={salvar} />
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

  return {
    props: {},
  };
}
