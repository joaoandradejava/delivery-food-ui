import Link from "next/link";
import InputMenuTopo from "./InputMenuTopo";
import { ShoppingCart } from "lucide-react";
import { User2 } from "lucide-react";
import { useContext, useState } from "react";
import { UsuarioContext } from "@/contexts/usuario-context";

export default function MenuTopo() {
  const { isAutenticado, usuarioAutenticado, sairSistema } =
    useContext(UsuarioContext);
  const [showOptions, setShowOptions] = useState(false);

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
              <Link href="/cadastro" className="font-bold">
                cadastre-se
              </Link>{" "}
              ou <br />
              <Link href="/login" className="font-bold">
                faça seu login
              </Link>
            </span>
          ) : (
            <div className="relative">
              {/* Botão de menu */}

              <button
                className="flex gap-3  justify-normal  items-center  text-white font-bold"
                onClick={() => setShowOptions(!showOptions)}
              >
                <User2 size={60} />

                {usuarioAutenticado?.nome.split(" ")[0]}
              </button>

              {/* Opções do menu */}
              {showOptions && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    href="/minha-conta/dados-cadastrais"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Meus dados
                  </Link>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Meus endereços
                  </a>
                  <a
                    onClick={sairSistema}
                    className="hover:cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sair
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <ShoppingCart size={50} />
      </div>
    </>
  );
}
