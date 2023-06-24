import {
  LINK_LISTA_CATEGORIAS_ADMIN,
  LINK_LISTA_PRODUTOS_ADMIN,
} from "@/utils/routes";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuLateralAdmin() {
  const router = useRouter();
  const links = [
    { label: "Categorias", link: LINK_LISTA_CATEGORIAS_ADMIN },
    { label: "Produtos", link: LINK_LISTA_PRODUTOS_ADMIN },
  ];
  const link = links.filter((l) => router.pathname.startsWith(l.link))[0];
  const selecionado: string = link ? link.link : "";

  return (
    <div className="h-full text-white flex flex-col">
      {links.map((l) => {
        return (
          <Link
            className={`p-2 ${selecionado === l.link && "bg-white text-black"}`}
            href={l.link}
            key={l.link}
          >
            {l.label}
          </Link>
        );
      })}
    </div>
  );
}
