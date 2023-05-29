import CompraSegura from "@/components/CompraSegura";
import TopoTelaLoginECadastro from "@/components/TopoTelaLoginECadastro";
import Input from "@/components/forms/Input";
import { useForm } from "react-hook-form";

interface FormData {
  nome: string;
  email: string;
  senha: string;
  telefoneFixo: string;
}

export default function index() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  function cadastrar(data: FormData) {
    console.log(data);
  }

  return (
    <div className="h-screen flex flex-col space-y-5 items-center">
      <TopoTelaLoginECadastro />
      <div className="w-full md:w-96 border-blue-600 border-2">
        <div className="bg-gray-100 h-10 flex justify-center items-center font-bold text-red-600">
          <span>1. Identificação</span>
        </div>

        <div className="p-5">
          <form onSubmit={handleSubmit(cadastrar)}>
            <div className="space-y-3">
              <Input id="nome" label="Nome" type="text" register={register} />
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="teste@gmail.com"
                register={register}
              />
              <Input
                id="senha"
                label="Senha"
                type="password"
                register={register}
              />
              <Input
                id="telefoneFixo"
                label="Telefone fixo"
                type="text"
                placeholder="(00) 0 0000-0000"
                register={register}
              />
            </div>

            <div className="flex flex-col items-center space-y-3 mt-3">
              <button
                onClick={() => cadastrar}
                className="bg-btn-cor-verde rounded h-12 w-full md:w-72 text-white font-bold text-2xl"
              >
                Cadastrar
              </button>
            </div>
          </form>
          <CompraSegura />
        </div>
      </div>
    </div>
  );
}
