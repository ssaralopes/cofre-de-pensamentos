import { useEffect, useState } from "react";
import { encryptData, decryptData } from "../utils/cryptoUtils";
import ThoughtModal from "./ThoughtModal";
import ReadMoreModal from "./ReadMoreModal";

export default function Vault({ password, onLogout }) {
  const [thoughts, setThoughts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedThought, setSelectedThought] = useState(null);

  useEffect(() => {
    const cipher = localStorage.getItem("vault-data");

    if (cipher) {
      const data = decryptData(cipher, password);

      if (data) {
        setThoughts(data);
      }
    }
  }, [password]);

  const saveData = (data) => {
    const cipher = encryptData(data, password);
    localStorage.setItem("vault-data", cipher);
  };

  const addThought = ({ text, card }) => {
    const newData = [
      ...thoughts,
      {
        id: Date.now(),
        text,
        card,
      },
    ];

    setThoughts(newData);
    saveData(newData);
  };

  const deleteThought = (id) => {
    const newData = thoughts.filter((t) => t.id !== id);

    setThoughts(newData);
    saveData(newData);
  };

  const openReadMore = (thought) => {
    setSelectedThought(thought);
  };

  const closeReadMore = () => {
    setSelectedThought(null);
  };

  const getCardImage = (card) => {
    const images = {
      estrelas: `${process.env.PUBLIC_URL}/img/estrelas.png`,
      lua: `${process.env.PUBLIC_URL}/img/lua.png`,
      sol: `${process.env.PUBLIC_URL}/img/sol.png`,
    };

    // Pensamentos antigos que ainda não possuem uma carta
    return images[card] || images.estrelas;
  };

  const getCardName = (card) => {
    const names = {
      estrelas: "Carta das Estrelas",
      lua: "Carta da Lua",
      sol: "Carta do Sol",
    };

    return names[card] || "Carta das Estrelas";
  };

  return (
    <div className="vault-container">
      <div className="vault-header">
        <h1>📖 Meu Cofre</h1>

        <button onClick={onLogout}>
          Sair
        </button>
      </div>

      <div className="thoughts-grid">
        {thoughts.map((t) => (
          <div key={t.id} className="thought-card">

            {/* Carta escolhida para este pensamento */}
            <img
              src={getCardImage(t.card)}
              alt={getCardName(t.card)}
              className="card-image"
            />

            {/* Conteúdo do pensamento */}
            <div className="thought-content">
              <p className="thought-text">
                {t.text.length > 200
                  ? t.text.substring(0, 200) + "..."
                  : t.text}
              </p>

              <div className="card-buttons">
                {t.text.length > 200 && (
                  <button
                    className="read-more-button"
                    onClick={() => openReadMore(t)}
                  >
                    Continuar lendo
                  </button>
                )}

                <button
                  className="delete-button"
                  onClick={() => deleteThought(t.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className="add-thought-button"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {showModal && (
        <ThoughtModal
          onClose={() => setShowModal(false)}
          onSave={(thought) => {
            addThought(thought);
            setShowModal(false);
          }}
        />
      )}

      {selectedThought && (
        <ReadMoreModal
          thought={selectedThought}
          onClose={closeReadMore}
        />
      )}
    </div>
  );
}
