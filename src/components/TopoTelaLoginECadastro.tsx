import Link from "next/link";

export default function TopoTelaLoginECadastro() {
  return (
    <div className="h-20 text-white bg-cor-marrom w-full flex justify-center ">
      <Link href="/" className="flex items-center gap-3">
        <span className="text-3xl font-bold uppercase">
          Pastelaria <br />
          do beiçola
        </span>
        <img src="images/beicola.png" className="h-16" alt="" />
      </Link>
    </div>
  );
}
