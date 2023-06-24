import Layout from "@/components/Layout";
import Paginacao from "@/components/Paginacao";
import ProdutoCard from "@/components/ProdutoCard";
import { CategoriaModel } from "@/models/categoria";
import { Page } from "@/models/pagination";
import { ProdutoModel } from "@/models/produto";
import { buscarTodasCategorias } from "@/services/categoria-service";
import { buscarTodosProdutos } from "@/services/produto-service";
import { useEffect, useState } from "react";

export default function Index() {
  const [paginaAtual, setPaginaAtual] = useState<number>(0);
  const [produtosPage, setPreodutosPage] = useState<Page<ProdutoModel>>();
  const [categorias, setCategorias] = useState<Page<CategoriaModel>>();
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    CategoriaModel[]
  >([]);

  const size: number = 8;
  useEffect(() => {
    buscarCategorias();
  }, []);

  useEffect(() => {
    buscarProdutos();
  }, [paginaAtual, categoriasSelecionadas]);

  const onAlterarPagina = (selectedPage: any) => {
    setPaginaAtual(selectedPage.selected);
  };

  function buscarProdutos() {
    const categoriaIds: number[] = categoriasSelecionadas
      ? categoriasSelecionadas.map((c) => c.id)
      : [];
    console.log(categoriaIds);

    buscarTodosProdutos(
      { page: paginaAtual, size },
      { categoriaIds: categoriaIds }
    ).then((data) => {
      setPreodutosPage(data);
    });
  }

  function buscarCategorias() {
    buscarTodasCategorias({ page: 0, size: 100 }).then((data) => {
      setCategorias(data);
    });
  }

  function clicarCheckbox(categoriaModel: CategoriaModel) {
    const selected: boolean = categoriasSelecionadas.includes(categoriaModel);

    if (!selected) {
      setCategoriasSelecionadas([...categoriasSelecionadas, categoriaModel]);
    } else {
      setCategoriasSelecionadas(
        categoriasSelecionadas.filter((c) => c.id !== categoriaModel.id)
      );
    }
  }
  return (
    <Layout>
      <div className="flex flex-col  p-5">
        <div className="flex justify-between">
          <div className="w-2/12">
            {categorias?.content.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={`option-${index}`}
                  onChange={() => clicarCheckbox(option)}
                  className="mr-2"
                />
                <label htmlFor={`option-${index}`} className="text-gray-700">
                  {option.nome}
                </label>
              </div>
            ))}
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="flex gap-3 items-center justify-center flex-wrap ">
              {produtosPage?.content.map((p) => (
                <ProdutoCard key={p.id} produto={p} />
              ))}
            </div>

            <Paginacao
              totalPages={produtosPage?.totalPages}
              onAlterarPagina={onAlterarPagina}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
