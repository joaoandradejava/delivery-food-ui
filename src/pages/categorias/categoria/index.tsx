import MenuTopo from "@/components/MenuTopo";
import Toast from "@/components/Toast";
import Input from "@/components/forms/Input";
import { CategoriaInput } from "@/models/categoria";
import { cadastrarCategoria } from "@/services/categoria-service";
import { mostrarMensagemSucesso } from "@/services/toast-service";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_O,
} from "@/utils/constants";
import { isTemAcesso } from "@/utils/guard";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  nome: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(3, CAMPO_VALOR_MINIMO_O("nome", 3))
    .max(255, CAMPO_VALOR_MAXIMO_O("nome", 255)),
});
export default function Index() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function salvar(data: CategoriaInput) {
    cadastrarCategoria(data).then((data) => {
      mostrarMensagemSucesso("Cadastro realizado com sucesso");
      router.push(`categoria/${data.id}`);
    });
  }

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="w-11/12 mx-auto flex flex-col">
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
          <div className="flex justify-end gap-3">
            <Link href="/categorias">
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

  return {
    props: {},
  };
}
