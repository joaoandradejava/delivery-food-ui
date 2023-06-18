import MenuTopo from "@/components/MenuTopo";
import Input from "@/components/forms/Input";
import { verificarSeUsuarioEstarLogadoPassandoContext } from "@/services/auth-service";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface Opcao {
  titulo: string;
  subtitulo: string;
  href: string;
}

export default function index() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function salvar() {}

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="w-5/12 mx-auto">
        <span className="text-3xl font-bold">Meus dados</span>
        <form className="flex flex-col gap-3 mt-3" action="">
          <Input
            id="nome"
            label="Nome completo"
            required
            type="text"
            register={register}
          />
          <Input
            id="cpf"
            label="Cpf"
            placeholder="000.000.000-00"
            type="text"
            register={register}
          />
          <div className="flex justify-end">
            <button
              onClick={salvar}
              className="bg-red-600 text-white font-bold p-2 w-20 rounded-xl hover:bg-red-800 shadow-xl"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const isUsuarioLogado: boolean =
    verificarSeUsuarioEstarLogadoPassandoContext(context);

  if (!isUsuarioLogado) {
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
