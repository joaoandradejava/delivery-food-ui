import ConfirmacaoModal from "@/components/ConfirmacaoModal";
import MenuTopo from "@/components/MenuTopo";
import Paginacao from "@/components/Paginacao";
import Toast from "@/components/Toast";
import { CategoriaModel } from "@/models/categoria";
import { Page } from "@/models/pagination";
import {
  buscarTodasCategorias,
  deletarCategoriaPorId,
} from "@/services/categoria-service";
import {
  mostrarMensagemError,
  mostrarMensagemSucesso,
} from "@/services/toast-service";
import { isTemAcesso } from "@/utils/guard";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function Index() {
  const [idCategoria, setIdCategoria] = useState(0);
  const router = useRouter();
  const [categoriaPage, setCategoriaPage] = useState<Page<CategoriaModel>>();
  const [page, setPage] = useState<number>(0);
  const [
    isModalConfirmacaoExclusaoCategoriaOpen,
    setIsModalConfirmacaoExclusaoCategoriaOpen,
  ] = useState(false);
  const size: number = 10;
  Modal.setAppElement("#__next");

  useEffect(() => {
    buscarCategorias();
  }, []);

  useEffect(() => {
    buscarCategorias();
  }, [page]);
  const onAlterarPagina = (selectedPage: any) => {
    setPage(selectedPage.selected);
  };
  async function buscarCategorias() {
    const categoria: Page<CategoriaModel> = await buscarTodasCategorias({
      page: page,
      size: size,
    });
    setCategoriaPage(categoria);
  }

  function isTemCategoria(): boolean {
    return !!categoriaPage && categoriaPage.totalElements > 0;
  }

  async function abrirModalExcluir(id: number) {
    setIdCategoria(id);
    setIsModalConfirmacaoExclusaoCategoriaOpen(true);
  }

  function deletarCategoria(id: number): void {
    deletarCategoriaPorId(id)
      .then((_) => {
        mostrarMensagemSucesso("Categoria deletada com sucesso");
        buscarCategorias();
      })
      .catch((e) => {
        mostrarMensagemError(e.response.data.userMessage);
      });
  }
  function confirmarExclusao(): void {
    setIsModalConfirmacaoExclusaoCategoriaOpen(false);
    deletarCategoria(idCategoria);
  }

  function cancelarExclusao(): void {
    setIsModalConfirmacaoExclusaoCategoriaOpen(false);
  }

  return (
    <div className="h-screen">
      <MenuTopo />
      <ConfirmacaoModal
        conteudoDaMensagem="Você tem certeza de que deseja excluir esta categoria? Esta ação não poderá ser desfeita."
        isAberto={isModalConfirmacaoExclusaoCategoriaOpen}
        onCancelar={cancelarExclusao}
        onConfirmar={confirmarExclusao}
      />
      <div className="flex flex-col w-11/12 mx-auto bg-white p-5 shadow-xl">
        <div className="flex flex-col gap-3 justify-center">
        <span className="text-xl font-bold">Categorias</span>
          <span className="mb-3 ">
            Cadastre aqui as categorias do seu sistema.
          </span>
        </div>
        <div className="mb-5">
          <Link href="categorias/categoria">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Novo
            </button>
          </Link>
        </div>
        {!isTemCategoria() ? (
          <div className="flex justify-center">
            <span className="text-center font-bold text-3xl">
              Não há categorias disponiveis
            </span>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center">
            <table className="bg-white border-2 w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-bold uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-bold uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-bold uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoriaPage?.content.map((c) => {
                  return (
                    <tr key={c.id}>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {c.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                        {c.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-5">
                        <button
                          className=" text-blue-500"
                          onClick={() =>
                            router.push(`/categorias/categoria/${c.id}`)
                          }
                        >
                          <Edit />
                        </button>
                        <button
                          className="text-red-500"
                          onClick={() => abrirModalExcluir(c.id)}
                        >
                          <Trash />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <Paginacao
              totalPages={
                categoriaPage?.totalPages ? categoriaPage.totalPages : 0
              }
              onAlterarPagina={onAlterarPagina}
            />
          </div>
        )}
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
