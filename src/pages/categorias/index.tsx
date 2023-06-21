import MenuTopo from "@/components/MenuTopo";
import Toast from "@/components/Toast";
import { CategoriaModel } from "@/models/categoria";
import { Page } from "@/models/pagination";
import {
  buscarTodasCategorias,
  deletarCategoriaPorId,
} from "@/services/categoria-service";
import { mostrarMensagemSucesso } from "@/services/toast-service";
import { isTemAcesso } from "@/utils/guard";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Index() {
  const router = useRouter();
  const [categoriaPage, setCategoriaPage] = useState<Page<CategoriaModel>>();
  const [page, setPage] = useState<number>(0);
  const size: number = 20;

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function buscarCategorias() {
    const categoria: Page<CategoriaModel> = await buscarTodasCategorias({
      page: page,
      size: size,
    });
    console.log(categoria);
    setCategoriaPage(categoria);
  }

  function isTemCategoria(): boolean {
    return !!categoriaPage && categoriaPage.totalElements > 0;
  }

  function abrirModalExcluir(id: number): void {
    if (confirm("tem certeza que deseja excluir essa categoria?")) {
      deletarCategoriaPorId(id).then((_) => {
        mostrarMensagemSucesso("Categoria deletada com sucesso");
        buscarCategorias();
      });
    }
  }

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="flex flex-col w-11/12 mx-auto">
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
              Ainda não há categorias
            </span>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <table className="bg-white border-2 w-full">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>

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
            </table>
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
