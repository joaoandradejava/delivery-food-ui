import ConfirmacaoModal from "@/components/ConfirmacaoModal";
import MenuTopo from "@/components/MenuTopo";
import Paginacao from "@/components/Paginacao";
import Toast from "@/components/Toast";
import { Page } from "@/models/pagination";
import { ProdutoModel } from "@/models/produto";
import { buscarTodosProdutos, deletarProdutoPorId } from "@/services/produto-service";
import { mostrarMensagemError, mostrarMensagemSucesso } from "@/services/toast-service";
import { formatarDinheiro } from "@/utils/constants";
import { isTemAcesso } from "@/utils/guard";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Link from "next/link";

export default function Index(){
    const [idProduto, setIdProduto] = useState('');
    const router = useRouter();
    const [produtoPage, setProdutoPage] = useState<Page<ProdutoModel>>();
    const [page, setPage] = useState<number>(0);
    const [
      isModalConfirmacaoExclusaoProdutoOpen,
      setIsModalConfirmacaoExclusaoProdutoOpen,
    ] = useState(false);
    const size: number = 10;
    Modal.setAppElement("#__next");
  
    useEffect(() => {
      buscarProdutos();
    }, []);
  
    useEffect(() => {
      buscarProdutos();
    }, [page]);
    const onAlterarPagina = (selectedPage: any) => {
      setPage(selectedPage.selected);
    };
    async function buscarProdutos() {
      const produto: Page<ProdutoModel> = await buscarTodosProdutos({
        page: page,
        size: size,
      });
      setProdutoPage(produto);
    }
  
    function isTemProduto(): boolean {
      return !!produtoPage && produtoPage.totalElements > 0;
    }
  
    async function abrirModalExcluir(id: string) {
      setIdProduto(id);
      setIsModalConfirmacaoExclusaoProdutoOpen(true);
    }
  
    function deletarProduto(id: string): void {
      deletarProdutoPorId(id)
        .then((_) => {
          mostrarMensagemSucesso("produto deletada com sucesso");
          buscarProdutos();
        })
        .catch((e) => {
          mostrarMensagemError(e.response.data.userMessage);
        });
    }
    function confirmarExclusao(): void {
      setIsModalConfirmacaoExclusaoProdutoOpen(false);
      deletarProduto(idProduto);
    }
  
    function cancelarExclusao(): void {
      setIsModalConfirmacaoExclusaoProdutoOpen(false);
    }
  
    return (
      <div className="h-screen">
        <MenuTopo />
        <ConfirmacaoModal
          conteudoDaMensagem="Você tem certeza de que deseja excluir esta produto? Esta ação não poderá ser desfeita."
          isAberto={isModalConfirmacaoExclusaoProdutoOpen}
          onCancelar={cancelarExclusao}
          onConfirmar={confirmarExclusao}
        />
        <div className="flex flex-col w-11/12 mx-auto">
          <div className="flex flex-col gap-3 justify-center items-center">
            <span className="text-3xl font-bold">Tela de Administração</span>
            <span className="text-2xl font-bold">Produtos</span>
          </div>
          <div className="mb-5">
            <Link href="produtos/produto">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Novo
              </button>
            </Link>
          </div>
          {!isTemProduto() ? (
            <div className="flex justify-center">
              <span className="text-center font-bold text-3xl">
                Não há produtos disponiveis
              </span>
            </div>
          ) : (
            <div className="w-full flex flex-col justify-center">
              <table className="bg-white border-2 w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nome
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {produtoPage?.content.map((p) => {
                    return (
                      <tr key={p.id}>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                          {p.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                          {p.nome}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                          {formatarDinheiro(p.preco)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 flex gap-5">
                          <button
                            className=" text-blue-500"
                            onClick={() =>
                              router.push(`/produtos/produto/${p.id}`)
                            }
                          >
                            <Edit />
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => abrirModalExcluir(p.id)}
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
                  produtoPage?.totalPages ? produtoPage.totalPages : 0
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