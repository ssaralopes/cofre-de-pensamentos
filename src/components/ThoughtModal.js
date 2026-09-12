import { useState } from "react";

export default function ThoughtModal({ onClose, onSave }) {
  const [text, setText] = useState("");
  const [selectedCard, setSelectedCard] = useState("");

  const cards = [
    {
      name: "estrelas",
      image: `${process.env.PUBLIC_URL}/img/estrelas.png`,
      alt: "Carta das Estrelas",
      meaning: "Sonhos, desejos e aquilo que você espera.",
    },
    {
      name: "lua",
      image: `${process.env.PUBLIC_URL}/img/lua.png`,
      alt: "Carta da Lua",
      meaning: "Sentimentos, dúvidas e pensamentos profundos.",
    },
    {
      name: "sol",
      image: `${process.env.PUBLIC_URL}/img/sol.png`,
      alt: "Carta do Sol",
      meaning: "Clareza, alegrias, conquistas e boas lembranças.",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() === "") return;
    if (!selectedCard) return;

    onSave({
      text: text.trim(),
      card: selectedCard,
    });
  };

  return (
    <div className="modal-form-overlay">
      <form onSubmit={handleSubmit} className="modal-form">
        <h2>Adicionar Pensamento</h2>

        <p className="card-selection-title">
          Escolha a carta que acompanhará este pensamento:
        </p>

        <div className="card-selection">
          {cards.map((card) => (
            <button
              key={card.name}
              type="button"
              className={`card-option ${
                selectedCard === card.name ? "selected" : ""
              }`}
              onClick={() => setSelectedCard(card.name)}
              title={card.meaning}
            >
              <img src={card.image} alt={card.alt} />
            </button>
          ))}
        </div>

        <p className="selected-card-meaning">
          {selectedCard
            ? cards.find((card) => card.name === selectedCard)?.meaning
            : "Escolha uma carta para seu pensamento."}
        </p>

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

