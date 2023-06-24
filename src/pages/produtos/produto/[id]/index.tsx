import MenuTopo from "@/components/MenuTopo";
import Toast from "@/components/Toast";
import Input from "@/components/forms/Input";
import SelectComponent from "@/components/forms/SelectComponent";
import { CategoriaModel } from "@/models/categoria";
import { Page } from "@/models/pagination";
import { ProdutoFullModel, ProdutoInput } from "@/models/produto";
import { buscarTodasCategorias } from "@/services/categoria-service";
import {
  atualizarProduto,
  buscarProdutoPorId,
} from "@/services/produto-service";
import { mostrarMensagemSucesso } from "@/services/toast-service";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_O,
} from "@/utils/constants";
import { isTemAcesso } from "@/utils/guard";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  produtoFullModel: ProdutoFullModel;
}

const schema = z.object({
  nome: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(3, CAMPO_VALOR_MINIMO_O("nome", 3))
    .max(255, CAMPO_VALOR_MAXIMO_O("nome", 255)),
  preco: z.string().nonempty(CAMPO_OBRIGATORIO),
  fotoUrl: z.string(),
  categorias: z
    .array(
      z.object({
        id: z.number(),
      })
    )
    .min(1, { message: "É precisso ter pelo menos 1 categoria" }),
  descricao: z.string().optional(),
});
export default function Index(props: Props) {
  const { produtoFullModel } = props;
  const [categorias, setCategorias] = useState<Page<CategoriaModel>>();
  const options = categorias?.content.map((c) => ({
    label: c.nome,
    value: c.id,
    id: c.id,
  }));
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: produtoFullModel.id,
      nome: produtoFullModel.nome,
      descricao: produtoFullModel.descricao,
      preco: produtoFullModel.preco.toString(),
      categorias: produtoFullModel.categorias,
    },
    resolver: zodResolver(schema),
  });
  console.log(errors);
  function salvar(data: ProdutoInput) {
    console.log(data);
    atualizarProduto(data, produtoFullModel.id).then((data) => {
      mostrarMensagemSucesso("Produto atualizado sucesso");
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
      <div className="w-full md:w-4/12  mx-auto flex flex-col pt-0 p-5">
        <span className="text-3xl font-bold text-center">Produto</span>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(salvar)}>
          <div className="w-2/12">
            <Input
              id="id"
              label="Id"
              type="text"
              register={register}
              disabled
            />
          </div>
          <Input
            id="nome"
            required
            label="Nome"
            type="text"
            error={errors.nome}
            register={register}
          />
          <Input
            id="preco"
            required
            label="Preço"
            type="number"
            error={errors.preco}
            register={register}
          />
          <Input
            id="fotoUrl"
            label="Foto url"
            type="text"
            error={errors.fotoUrl}
            register={register}
          />
          <SelectComponent
            name="categorias"
            control={control}
            label="Categorias"
            options={options}
            required
            error={errors.categorias}
          />
          <Input
            id="descricao"
            label="Descrição"
            type="text"
            error={errors.descricao}
            register={register}
          />
          <div className="flex justify-end gap-3">
            <Link href="/produtos">
              <button
                type="button"
                className="bg-white text-black font-bold p-2 w-20 rounded-xl hover:bg-slate-50 shadow-xl"
              >
                Voltar
              </button>
            </Link>

            <button
              type="submit"
              className="bg-red-600 text-white font-bold p-2 w-20 rounded-xl hover:bg-red-800 shadow-xl"
            >
              Salvar
            </button>
          </div>
        </form>
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

  const produtoFullModel: ProdutoFullModel = await buscarProdutoPorId(
    context.query.id
  );

  return {
    props: {
      produtoFullModel,
    },
  };
}
