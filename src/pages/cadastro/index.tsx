import CompraSegura from "@/components/CompraSegura";
import TopoTelaLoginECadastro from "@/components/TopoTelaLoginECadastro";
import Link from "next/link";

export default function index() {
    return (
        <div className="h-screen flex flex-col space-y-5 items-center">
      <TopoTelaLoginECadastro />
      <div className="w-full md:w-96 h-96 border-blue-600 border-2">
        <div className="bg-gray-100 h-10 flex justify-center items-center font-bold text-red-600">
          <span>1. Identificação</span>
        </div>

        <div className="p-5">
          <div className="space-y-3">
            <input
              type="email"
              className="bg-gray-50 w-full h-11 rounded-xl p-2 border-gray-200 border-2 outline-blue-600"
              placeholder="email"
            />
            <input
              type="password"
              className="bg-gray-50 w-full h-11 rounded-xl p-2 border-gray-200 border-2 outline-blue-600"
              placeholder="email"
            />
          </div>

          <div className="flex flex-col items-center space-y-3 mt-3">
            <button className="bg-btn-cor-verde rounded h-12 w-full md:w-72 text-white font-bold text-2xl">
              Cadastrar
            </button>
            
          </div>
          <CompraSegura />
        </div>
      </div>
    </div>
    )
}