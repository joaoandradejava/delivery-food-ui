import Layout from "@/components/Layout";
import MenuTopo from "@/components/MenuTopo";
import ProdutoCard from "@/components/ProdutoCard";
import { Page } from "@/models/pagination";
import { ProdutoModel } from "@/models/produto";
import { buscarTodosProdutos } from "@/services/produto-service";
import { useEffect, useState } from "react";

export default function Index() {
  const [paginaAtual, setPaginaAtual] = useState<number>(0);
  const [produtosPage, setPreodutosPage] = useState<Page<ProdutoModel>>();
  const size: number = 12;

  useEffect(() => {
    buscarTodosProdutos({ page: paginaAtual, size }).then((data) => {
      setPreodutosPage(data);
    });
  }, []);

  return (
    <Layout>
      <div className="flex gap-3 items-center flex-wrap">
        {produtosPage?.content.map((p) => (
          <ProdutoCard key={p.id} produto={p} />
        ))}
      </div>
    </Layout>
  );
}
