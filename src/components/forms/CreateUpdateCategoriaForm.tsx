import Input from "@/components/forms/Input";
import { CategoriaInput, CategoriaModel } from "@/models/categoria";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_O,
} from "@/utils/constants";
import { LINK_LISTA_CATEGORIAS_ADMIN } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  categoriaModel?: CategoriaModel;
  onSalvarOuAtualizar(data: CategoriaInput): void;
}

const schema = z.object({
  nome: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(3, CAMPO_VALOR_MINIMO_O("nome", 3))
    .max(255, CAMPO_VALOR_MAXIMO_O("nome", 255)),
});
export default function CreateUpdateCategoriaForm(props: Props) {
  const { categoriaModel, onSalvarOuAtualizar } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues:
      categoriaModel != undefined
        ? {
            id: categoriaModel.id,
            nome: categoriaModel.nome,
          }
        : {},
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
      <div className="flex justify-end gap-3">
        <Link href={LINK_LISTA_CATEGORIAS_ADMIN}>
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
