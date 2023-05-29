import CompraSegura from "@/components/CompraSegura";
import TopoTelaLoginECadastro from "@/components/TopoTelaLoginECadastro";
import Input from "@/components/forms/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function index() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function realizarLogin(data: any) {
    console.log(data);
  }

  return (
    <div className="h-screen flex flex-col space-y-5 items-center">
      <TopoTelaLoginECadastro />
      <div className="w-full md:w-96 h-96 border-blue-600 border-2">
        <div className="bg-gray-100 h-10 flex justify-center items-center font-bold text-red-600">
          <span>1. Identificação</span>
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit(realizarLogin)}>
            <div className="space-y-3">
              <Input type="email" id="email" register={register} />
              <Input type="password" id="senha" register={register} />
            </div>

            <div className="flex flex-col items-center space-y-3 mt-3">
              <button
                onClick={() => realizarLogin}
                className="bg-btn-cor-verde rounded h-12 w-full md:w-72 text-white font-bold text-2xl"
              >
                Continuar
              </button>
              <Link
                href="/cadastro"
                className="text-xs text-blue-600 hover:underline"
              >
                Esqueceu sua senha? Clique aqui
              </Link>
            </div>
          </form>

          <CompraSegura />
        </div>
      </div>
    </div>
  );
}
