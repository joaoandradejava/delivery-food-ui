import MenuTopo from "@/components/MenuTopo";
import Toast from "@/components/Toast";
import CreateUpdateProdutoForm from "@/components/forms/CreateUpdateProdutoForm";
import { CategoriaModel } from "@/models/categoria";
import { Page } from "@/models/pagination";
import { ProdutoInput } from "@/models/produto";
import { buscarTodasCategorias } from "@/services/categoria-service";
import { cadastrarProduto } from "@/services/produto-service";
import { mostrarMensagemSucesso } from "@/services/toast-service";
import { isTemAcesso } from "@/utils/guard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Page<CategoriaModel>>();
  const options = categorias?.content.map((c) => ({
    label: c.nome,
    value: c.id,
    id: c.id,
  }));

  function salvar(data: ProdutoInput) {
    cadastrarProduto(data).then((data) => {
      mostrarMensagemSucesso("Cadastro realizado com sucesso");
      router.push(`produto/${data.id}`);
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
    <div className="h-screen">
      <MenuTopo />
      <div className="w-full md:w-4/12  mx-auto flex flex-col pt-3 p-5 bg-white shadow-xl rounded">
        <span className="text-3xl font-medium text-center">Produto</span>
        <CreateUpdateProdutoForm
          options={options}
          onSalvarOuAtualizar={salvar}
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

  return {
    props: {},
  };
}
