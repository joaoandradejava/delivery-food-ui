import Link from "next/link";
import InputMenuTopo from "./InputMenuTopo";
import { ShoppingCart } from "lucide-react";
import { useContext, useState } from "react";
import { UsuarioContext } from "@/contexts/usuario-context";
import { LINK_PAGINA_CADASTRO, LINK_PAGINA_LOGIN } from "@/utils/routes";
import MenuDropdown from "./MenuDropwdown";

export default function MenuTopo() {
  const { isAutenticado } = useContext(UsuarioContext);

  return (
    <>
      <div className="bg-black text-cor-marrom flex justify-center p-1">
        <span className="">
          Simplesmente o melhor <span className="font-bold">pastel</span> da sua
          região.
        </span>
      </div>
      <div className="bg-cor-marrom text-white flex justify-between items-center h-32 mb-3 px-5">
        <button className="md:hidden block">#</button>
        <Link href="/">
          <span className="md:text-3xl text-2xl font-bold">
            Pastelaria <br className="md:block hidden"></br> do beiçola
          </span>
        </Link>
        <div className="md:block hidden w-4/12">
          <InputMenuTopo />
        </div>
        <div className="md:flex hidden flex  items-center gap-3 w-2/12">
          {!isAutenticado ? (
            <span className="text-sm">
              Bem vindo visitante, <br />{" "}
              <Link href={LINK_PAGINA_CADASTRO} className="font-bold">
                cadastre-se
              </Link>{" "}
              ou <br />
              <Link href={LINK_PAGINA_LOGIN} className="font-bold">
                faça seu login
              </Link>
            </span>
          ) : (
            <MenuDropdown />
          )}
        </div>

        <ShoppingCart size={50} />
      </div>
    </>
  );
}
