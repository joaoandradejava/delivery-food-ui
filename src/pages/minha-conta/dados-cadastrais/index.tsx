import MenuTopo from "@/components/MenuTopo";
import { verificarSeUsuarioEstarLogadoPassandoContext } from "@/services/auth-service";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Opcao {
  titulo: string;
  subtitulo: string;
  href: string;
}

export default function index() {
  const opcoes: Opcao[] = [
    {
      titulo: "Informção pessoais",
      subtitulo: "Nome completo e CPF",
      href: "informacoes-pessoais",
    },
    {
      titulo: "Dados de contato",
      subtitulo: "E-mail e telefone de contato",
      href: "dados-contato",
    },
  ];

  return (
    <div className="h-screen">
      <MenuTopo />
      <div className="w-5/12 mx-auto">
        <span className="text-3xl font-bold">Meus dados</span>
        <div className="flex flex-col gap-3 mt-5">
          {opcoes.map((o) => {
            return (
              <Link href={o.href} key={o.href}>
                <div className="py-3 w-full border-b-2 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">{o.titulo}</span>
                    <span>{o.subtitulo}</span>
                  </div>
                  <ChevronRight color="red" />
                </div>
              </Link>
            );
          })}
        </div>
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
