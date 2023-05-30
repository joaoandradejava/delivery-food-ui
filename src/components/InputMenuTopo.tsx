import { ProdutoModel } from "@/models/produto";
import { buscarTodosProdutos } from "@/services/produto-service";
import {
  fazerUmaBuscaComDeterminadoTempo,
  formatarDinheiro,
} from "@/utils/constants";
import { spawn } from "child_process";
import { Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useState } from "react";

export default function InputMenuTopo() {
  const [produtos, setProdutos] = useState<ProdutoModel[]>();
  const [nome, setNome] = useState<string>();

  function search() {}
  function wait(milliseconds: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, milliseconds);
    });
  }
  async function atualizarBusca(valor: string) {
    fazerUmaBuscaComDeterminadoTempo(async () => {
      setNome(valor);
      const produtos = await buscarTodosProdutos(
        { page: 0, size: 5 },
        { nome: valor }
      );
      setProdutos(produtos.content);
    });
  }

  return (
    <div className="w-full relative text-black bg-white h-10 rounded flex justify-between items-center">
      <input
        type="text"
        placeholder="Encontre a sua comida"
        className="px-5 text-sm w-full h-full border-none outline-none"
        onChange={(e) => atualizarBusca(e.target.value)}
      />
      <Search
        color="black"
        className="p-1 hover:cursor-pointer"
        onClick={search}
        size={40}
      />
      {nome?.trim() && produtos && produtos?.length > 0 ? (
        <div className="absolute top-full left-0 w-full bg-gray-100 border border-gray-300">
          {produtos.map((p) => (
            <Link href="" key={p.id}>
              <div className="p-2 flex items-center gap-3 hover:bg-gray-200 text-sm">
                <img
                  src={p.fotoUrl ? p.fotoUrl : "images/sem-foto.jpg"}
                  className="w-10"
                  alt=""
                />
                <div className="flex flex-col">
                  <span>{p.nome}</span>
                  <span className="font-bold text-blue-800">
                    {formatarDinheiro(p.preco)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
