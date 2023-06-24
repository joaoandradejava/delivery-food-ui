import { LINK_PAGINA_INICIAL } from "@/utils/routes"
import Link from "next/link"
import MenuDropdown from "../MenuDropwdown"

export default function MenuTopoAdmin(){

    return <div className="h-10 p-2 bg-blue-950 text-white text-sm flex justify-between items-center">
        <Link href={LINK_PAGINA_INICIAL}>
            <span className="font-bold text-xl">Pastelaria do beiçola</span>
        </Link>
        <div>
            <MenuDropdown showFullName/>
        </div>
    </div>
}