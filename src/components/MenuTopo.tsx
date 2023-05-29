import Link from "next/link";

export default function MenuTopo() {
  return (
    <div className="bg-cor-marrom text-white flex justify-between items-center h-32">
      <button className="md:hidden block">#</button>
      <Link href="/">
        <span className="text-3xl font-bold">
          Pastelaria <br /> do beiçola
        </span>
      </Link>
      <div className="md:block hidden">
        <input type="text" />
      </div>
      <span className="text md:block hidden text-sm">
        Bem vindo visitante, <br />{" "}
        <Link href="/cadastro" className="font-bold">
          cadastre-se
        </Link>{" "}
        ou <br />
        <Link href="/cadastro" className="font-bold">
          faça seu login
        </Link>
      </span>
      <span>Carrinho</span>
    </div>
  );
}
