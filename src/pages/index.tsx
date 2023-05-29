import MenuTopo from "@/components/MenuTopo";

export default function index(){
  return (
    <div className="h-screen">
      <div className="bg-black text-cor-marrom flex justify-center p-1">
        <span className="">Simplesmente o melhor <span className="font-bold">pastel</span> da sua região.</span>
      </div>
      <MenuTopo />
    </div>
  )
}