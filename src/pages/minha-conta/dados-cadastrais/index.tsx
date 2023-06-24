import Layout from "@/components/Layout";
import MenuTopo from "@/components/MenuTopo";
import { verificarSeUsuarioEstarLogadoPassandoContext } from "@/services/auth-service";
import {
  LINK_DADOS_CONTATO,
  LINK_INFORMACOES_PESSOAIS,
  LINK_MUDAR_CREDENCIAIS,
} from "@/utils/routes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Opcao {
  titulo: string;
  subtitulo: string;
  href: string;
}

export default function Index() {
  const opcoes: Opcao[] = [
    {
      titulo: "Informção pessoais",
      subtitulo: "Nome completo",
      href: LINK_INFORMACOES_PESSOAIS,
    },
    {
      titulo: "Dados de contato",
      subtitulo: "E-mail e telefone de contato",
      href: LINK_DADOS_CONTATO,
    },
    {
      titulo: "Credenciais",
      subtitulo: "Altere sua senha",
      href: LINK_MUDAR_CREDENCIAIS,
    },
  ];

  return (
    <Layout>
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
    </Layout>
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
