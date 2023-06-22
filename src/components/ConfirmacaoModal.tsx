import Modal from "react-modal";

interface ConfirmacaoModalProps {
  isAberto: boolean;
  onCancelar: () => void;
  onConfirmar: () => void;
  conteudoDaMensagem: string;
}

export default function ConfirmacaoModal({
  isAberto,
  onConfirmar,
  onCancelar,
  conteudoDaMensagem,
}: ConfirmacaoModalProps) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      maxWidth: "400px",
      margin: "auto",
      borderRadius: "4px",
      height: "180px",
      padding: "20px",
    },
  };

  return (
    <Modal
      isOpen={isAberto}
      onRequestClose={onCancelar}
      contentLabel="Modal de Confirmação"
      style={customStyles}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-1">Confirmar ação</h2>
          <p className="mb-4">{conteudoDaMensagem}</p>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            onClick={onConfirmar}
          >
            Confirmar
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded ml-2"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
