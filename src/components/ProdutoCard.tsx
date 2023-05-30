import { ProdutoModel } from "@/models/produto";
import { formatarDinheiro } from "@/utils/constants";

interface ProdutoCardProps {
  produto: ProdutoModel;
}

export default function ProdutoCard(props: ProdutoCardProps) {
  const { produto } = props;

  return (
    <div className="w-72 h-96 border rounded flex flex-col p-5 justify-between shadow">
      <div className="flex flex-col gap-3 hover:cursor-pointer">
        <img
          src={produto.fotoUrl ? produto.fotoUrl : "images/sem-foto.jpg"}
          className="h-40 mx-auto"
          alt=""
        />

        <span className="font-bold">{produto.nome}</span>
      </div>
      <div className="space-y-3">
        <span className="text-btn-cor-verde font-bold text-2xl">
          {formatarDinheiro(produto.preco)}
        </span>
        <button className="bg-btn-cor-verde h-12 w-full text-xl text-white font-bold mx-auto">
          Comprar
        </button>
      </div>
    </div>
  );
}
