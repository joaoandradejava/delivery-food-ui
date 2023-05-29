export default function CompraSegura() {
  return (
    <div className="flex flex-col items-center gap-1 mt-5">
      <span
        className="text-btn-cor-verde font-bold flex gap-3"
        style={{ color: "#4AAE51" }}
      >
        <img src="images/cadeado.svg" alt="" />
        Compra 100% segura
      </span>
      <span className="text-xs">
        Seus dados pessoais estão protegidos, todas as informações são
        criptografadas para sua segurança.
      </span>
    </div>
  );
}
