import { useState } from "react";

export default function ThoughtModal({ onClose, onSave }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSave(text.trim());
  };

  return (
    <div className="modal-overlay">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Adicionar Pensamento</h2>
        <textarea
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite seu pensamento aqui..."
        />
        <div className="modal-buttons">
          <button
            type="button"
            onClick={onClose}
            className="cancel-button"
          >
            Cancelar
          </button>
          <button type="submit" className="save-button">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
