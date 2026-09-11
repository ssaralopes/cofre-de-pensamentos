import { useState } from "react";

export default function ReadMoreModal({ thought, onClose }) {
  const [expandido, setExpandido] = useState(false);
  const limite = 600; // número de caracteres a exibir inicialmente

  const textoCompleto = thought.text;
  const precisaExpandir = textoCompleto.length > limite;

  const textoExibido = expandido
    ? textoCompleto
    : textoCompleto.slice(0, limite);

  return (
    <div className="modal-overlay">
      <div className="thought-card modal-content">
        <h2>📜 Anotação Completa</h2>
        <p>{textoExibido}{!expandido && precisaExpandir && "..."}</p>

        <div className="modal-footer">
          {precisaExpandir && !expandido && (
            <button className="read-more-button modal-read-more" 
              onClick={() => setExpandido(true)}
            >
              mostrar mais
            </button>
         )}
          <button className="close-button" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}


