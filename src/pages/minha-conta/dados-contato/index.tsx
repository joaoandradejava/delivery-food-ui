import MenuTopo from "@/components/MenuTopo";
import Input from "@/components/forms/Input";
import {
  UsuarioAutenticadoModel,
  UsuarioFullModel,
  UsuarioUpdateInput,
} from "@/models/usuario";
import { getUsuarioLogadoPassandoContext } from "@/services/auth-service";
import {
  atualizarUsuario,
  buscarUsuarioPorId,
} from "@/services/usuario-service";
import {
  CAMPO_OBRIGATORIO,
  CAMPO_VALOR_MAXIMO_O,
  CAMPO_VALOR_MINIMO_O,
  EMAIL_INVALIDO,
  TELEFONE_INVALIDO,
} from "@/utils/constants";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "@/components/Toast";
import {
  mostrarMensagemError,
  mostrarMensagemSucesso,
} from "@/services/toast-service";

interface Props {
  usuarioFullModel: UsuarioFullModel;
}

const schema = z.object({
  email: z
    .string()
    .nonempty(CAMPO_OBRIGATORIO)
    .email(EMAIL_INVALIDO)
    .max(255, CAMPO_VALOR_MAXIMO_O("email", 255)),

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

export default function index(props: Props) {
  const { usuarioFullModel } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: usuarioFullModel.email,
      telefoneCelular: usuarioFullModel.telefoneCelular,
    },
    resolver: zodResolver(schema),
  });

  function salvar(data: UsuarioUpdateInput) {
    data.nome = usuarioFullModel.nome;

    atualizarUsuario(usuarioFullModel.id, data)
      .then((_) => {
        mostrarMensagemSucesso("Seus dados foram atualizados com sucesso.");
      })
      .catch((e) => {
        mostrarMensagemError(e.response.data.userMessage);
      });
  }

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="w-5/12 mx-auto">
        <span className="text-3xl font-bold">Dados de contato</span>
        <form
          className="flex flex-col gap-3 mt-3"
          onSubmit={handleSubmit(salvar)}
        >
          <Input
            id="email"
            label="Email"
            required
            type="email"
            error={errors.email}
            register={register}
          />
          <Input
            id="telefoneCelular"
            label="Telefone fixo"
            required
            type="text"
            error={errors.telefoneCelular}
            maskFormat="(99) 9 9999-9999"
            placeholder="(00) 0 0000-0000"
            register={register}
          />
          <div className="flex justify-end">
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
  const usuarioLogado: UsuarioAutenticadoModel | undefined =
    getUsuarioLogadoPassandoContext(context);

  if (usuarioLogado) {
    const usuarioFullModel: UsuarioFullModel = await buscarUsuarioPorId(
      usuarioLogado.id,
      usuarioLogado.tokenJwt
    );
    return {
      props: {
        usuarioFullModel: usuarioFullModel,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
