import { UsuarioContext } from "@/contexts/usuario-context";
import {
  LINK_LISTA_CATEGORIAS_ADMIN,
  LINK_PAGINA_DADOS_CADASTRAIS,
} from "@/utils/routes";
import { User2 } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

interface MenuDropdownProps {
  showFullName?: boolean;
}

export default function MenuDropdown(props: MenuDropdownProps) {
  const { showFullName } = props;
  const { usuarioAutenticado, sairSistema } = useContext(UsuarioContext);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex gap-2  justify-normal  items-center  text-white font-bold"
        onClick={() => setShowOptions(!showOptions)}
      >
        <User2 size={40} />

        {showFullName
          ? usuarioAutenticado?.nome
          : usuarioAutenticado?.nome.split(" ")[0]}
      </button>

      {/* Opções do menu */}
      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <Link
            href={LINK_PAGINA_DADOS_CADASTRAIS}
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
          {usuarioAutenticado?.isAdmin && (
            <Link
              href={LINK_LISTA_CATEGORIAS_ADMIN}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Área de administrador
            </Link>
          )}
          <a
            onClick={sairSistema}
            className="hover:cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sair
          </a>
        </div>
      )}
    </div>
  );
}
