import Link from "next/link";
import InputMenuTopo from "./InputMenuTopo";
import { ShoppingCart } from "lucide-react";
import { User2 } from "lucide-react";

export default function MenuTopo() {
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
          <Link href="/login">
            <User2 size={40} className="block" />
          </Link>
          <span className="text-sm">
            Bem vindo visitante, <br />{" "}
            <Link href="/cadastro" className="font-bold">
              cadastre-se
            </Link>{" "}
            ou <br />
            <Link href="/cadastro" className="font-bold">
              faça seu login
            </Link>
          </span>
        </div>

        <ShoppingCart size={50} />
      </div>
    </>
  );
}
