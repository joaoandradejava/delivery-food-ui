import { useForm } from "react-hook-form";
import Input from "./Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_O,
} from "@/utils/constants";
import SelectComponent from "./SelectComponent";
import { ProdutoFullModel, ProdutoInput } from "@/models/produto";
import Link from "next/link";
import InputCurrency from "./InputCurrency";

interface CreateUpdateProdutoFormProps {
  produtoFullModel: ProdutoFullModel;
  onSalvarOuAtualizar(data: ProdutoInput): void;
  options: any[];
}

const schema = z.object({
  nome: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(3, CAMPO_VALOR_MINIMO_O("nome", 3))
    .max(255, CAMPO_VALOR_MAXIMO_O("nome", 255)),
  preco: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .transform((p) => {
      const currencyValue = p;
      const numericValue = Number(
        currencyValue.replace("R$", "").replace(".", "").replace(",", ".")
      );

      return numericValue;
    }),
  fotoUrl: z.string(),
  categorias: z
    .array(
      z.object({
        id: z.number(),
      })
    )
    .min(1, { message: "É necessário ter pelo menos 1 categoria." }),
  descricao: z.string().optional(),
});
export default function CreateUpdateProdutoForm(
  props: CreateUpdateProdutoFormProps
) {
  const { produtoFullModel, onSalvarOuAtualizar, options } = props;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues:
      produtoFullModel != undefined
        ? {
            id: produtoFullModel.id,
            nome: produtoFullModel.nome,
            descricao: produtoFullModel.descricao
              ? produtoFullModel.descricao
              : "",
            preco: produtoFullModel.preco.toString(),
            categorias: produtoFullModel.categorias,
          }
        : {
            categorias: [],
          },
    resolver: zodResolver(schema),
  });

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit(onSalvarOuAtualizar)}
    >
      <div className="w-2/12">
        <Input id="id" label="Id" type="text" register={register} disabled />
      </div>
      <Input
        id="nome"
        required
        label="Nome"
        type="text"
        error={errors.nome}
        register={register}
      />

      <InputCurrency
        id="preco"
        required
        label="Preço"
        error={errors.preco}
        register={register}
        defaultValue={produtoFullModel ? produtoFullModel.preco : 0}
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
  );
}
