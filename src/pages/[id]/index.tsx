import Layout from "@/components/Layout";
import MenuTopo from "@/components/MenuTopo";
import { ProdutoFullModel } from "@/models/produto";
import { buscarProdutoPorId } from "@/services/produto-service";
import { formatarDinheiro } from "@/utils/constants";

interface Props {
  produto: ProdutoFullModel;
}

export default function index(props: Props) {
  const { produto } = props;

  return (
    <Layout>
      <div className="w-11/12 mx-auto flex md:flex-row flex-col flex-wrap gap-5">
        <div className="flex-1 flex justify-end">
          <img
            src={produto.fotoUrl ? produto.fotoUrl : "images/sem-foto.jpg"}
            className="h-96"
            alt=""
          />
        </div>
        <div className="flex-1 flex flex-col gap-1 items-center md:items-start">
          <span className="text-2xl font-bold">{produto.nome}</span>
          <span className="text-lg font-bold">{produto.descricao}</span>
          <span className="font-bold text-btn-cor-verde text-3xl">
            {formatarDinheiro(produto.preco)}
          </span>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const produto: ProdutoFullModel = await buscarProdutoPorId(context.query.id);

  return {
    props: {
      produto,
    },
  };
}
