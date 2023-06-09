import MenuTopo from "@/components/MenuTopo";
import Toast from "@/components/Toast";
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import CreateUpdateProdutoForm from "@/components/forms/CreateUpdateProdutoForm";
import { CategoriaModel } from "@/models/categoria";
import { Page } from "@/models/pagination";
import { ProdutoFullModel, ProdutoInput } from "@/models/produto";
import { buscarTodasCategorias } from "@/services/categoria-service";
import {
  atualizarProduto,
  buscarProdutoPorId,
} from "@/services/produto-service";
import {
  mostrarMensagemError,
  mostrarMensagemSucesso,
} from "@/services/toast-service";
import { getUserMessageError } from "@/utils/constants";
import { isTemAcesso } from "@/utils/guard";
import { useEffect, useState } from "react";

interface Props {
  produtoFullModel: ProdutoFullModel;
}

export default function Index(props: Props) {
  const { produtoFullModel } = props;
  const [categorias, setCategorias] = useState<Page<CategoriaModel>>();
  const options = categorias?.content.map((c) => ({
    label: c.nome,
    value: c.id,
    id: c.id,
  }));

  function salvar(data: ProdutoInput) {
    console.log(data);
    atualizarProduto(data, produtoFullModel.id)
      .then((_) => {
        mostrarMensagemSucesso("Produto atualizado sucesso");
      })
      .catch((e) => {
        mostrarMensagemError(getUserMessageError(e));
      });
  }

  function buscarCategorias() {
    buscarTodasCategorias({ page: 0, size: 100 }).then((c) => {
      setCategorias(c);
    });
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  return (
    <LayoutAdmin>
      <div className="w-full md:w-9/12  mx-auto flex flex-col pt-3 p-5 bg-white shadow-xl rounded">
        <span className="text-3xl font-medium text-center">Produto</span>
        <CreateUpdateProdutoForm
          produtoFullModel={produtoFullModel}
          onSalvarOuAtualizar={salvar}
          options={options}
        />
      </div>
    </LayoutAdmin>
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

  const produtoFullModel: ProdutoFullModel = await buscarProdutoPorId(
    context.query.id
  );

  return {
    props: {
      produtoFullModel,
    },
  };
}
