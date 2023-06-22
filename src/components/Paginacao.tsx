import ReactPaginate from "react-paginate";

interface PaginacaoProps {
  totalPages: number;
  onAlterarPagina: (selectedPage: any) => void;
}

export default function Paginacao(props: PaginacaoProps) {
  const { totalPages, onAlterarPagina } = props;

  return (
    <>
      <ReactPaginate
        containerClassName="flex gap-5 items-center justify-center mt-4"
        activeClassName="bg-blue-500 text-white px-3 py-2 rounded-md"
        pageCount={totalPages} // Total de páginas disponíveis
        pageRangeDisplayed={3} // Número de páginas exibidas no componente
        marginPagesDisplayed={1} // Número de páginas exibidas antes e depois da página atual
        onPageChange={onAlterarPagina} // Função para lidar com a alteração de página
        nextLabel="Próximo"
        previousLabel="Anterior"
      />
    </>
  );
}
