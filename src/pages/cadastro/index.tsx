import CompraSegura from "@/components/CompraSegura";
import TopoTelaLoginECadastro from "@/components/TopoTelaLoginECadastro";
import Input from "@/components/forms/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_A,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_A,
  CAMPO_VALOR_MINIMO_O,
  EMAIL_INVALIDO,
  TELEFONE_INVALIDO,
} from "@/utils/constants";
import { cadastrarUsuario } from "@/services/usuario-service";
import { UsuarioCreateInput } from "@/models/usuario";
import {
  mostrarMensagemError,
  mostrarMensagemSucesso,
} from "@/services/toast-service";
import Toast from "@/components/Toast";

const schema = z.object({
  nome: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(3, CAMPO_VALOR_MINIMO_O("nome", 3))
    .max(255, CAMPO_VALOR_MAXIMO_O("nome", 255)),
  email: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .email(EMAIL_INVALIDO)
    .max(255, CAMPO_VALOR_MAXIMO_O("email", 255)),
  senha: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .min(6, CAMPO_VALOR_MINIMO_A("senha", 6))
    .max(255, CAMPO_VALOR_MAXIMO_A("senha", 255)),
  telefoneCelular: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .refine(
      (t) => {
        const mask = /\(\d{2}\) \d \d{4}-\d{4}/;
        return mask.test(t);
      },
      { message: TELEFONE_INVALIDO }
    )
    .transform((t) => t.replace(/\D/g, "")),
});

export default function Index() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  function cadastrar(data: UsuarioCreateInput) {
    cadastrarUsuario(data)
      .then((u) => {
        mostrarMensagemSucesso("Cadastro realizado com sucesso");
      })
      .catch((e) => {
        mostrarMensagemError(e.response.data.userMessage);
      });
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
              <Input
                id="nome"
                required
                label="Nome"
                type="text"
                error={errors.nome}
                register={register}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                error={errors.email}
                required
                placeholder="teste@gmail.com"
                register={register}
              />
              <Input
                id="senha"
                label="Senha"
                type="password"
                error={errors.senha}
                required
                register={register}
              />
              <Input
                id="telefoneCelular"
                label="Telefone fixo"
                type="text"
                error={errors.telefoneCelular}
                required
                placeholder="(00) 0 0000-0000"
                maskFormat="(99) 9 9999-9999"
                register={register}
              />
            </div>

            <div className="flex flex-col items-center space-y-3 mt-3">
              <button
                type="submit"
                className="bg-btn-cor-verde rounded h-12 w-full md:w-72 text-white font-bold text-2xl"
              >
                Cadastrar
              </button>
            </div>
          </form>
          <CompraSegura />
        </div>
      </div>
      <Toast />
    </div>
  );
}
