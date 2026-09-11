import { useEffect, useState } from "react";
import { encryptData, decryptData } from "../utils/cryptoUtils";
import ThoughtModal from "./ThoughtModal";
import ReadMoreModal from "./ReadMoreModal"; // <-- Novo Modal de leitura

export default function Vault({ password, onLogout }) {
  const [thoughts, setThoughts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedThought, setSelectedThought] = useState(null); // <-- Estado para o "Continuar lendo"

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

  const addThought = (text) => {
    const newData = [...thoughts, { id: Date.now(), text }];
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

  return (
    <div className="vault-container">
      <div className="vault-header">
        <h1>📖 Meu Cofre</h1>
        <button onClick={onLogout}>Sair</button>
      </div>

      <div className="thoughts-grid">
        {thoughts.map((t) => (
          <div key={t.id} className="thought-card">
              {/* Imagem no topo do card */}
              <img
                // src="/card-frame.png" // <-- Coloque sua imagem na pasta public
                alt="Carta mágica"
                className="card-image"
              />

              {/* Texto da nota */}
              <p className="thought-text">
                {t.text.length > 200 ? t.text.substring(0, 200) + "..." : t.text}
              </p>

              <div className="card-buttons">
                {t.text.length > 200 && (
                  <button className="read-more-button" onClick={() => openReadMore(t)}>Continuar lendo</button>
                )}
                <button className="delete-button" onClick={() => deleteThought(t.id)}>Excluir</button>
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
          onSave={(text) => {
            addThought(text);
            setShowModal(false);
          }}
        />
      )}

      {selectedThought && (
        <ReadMoreModal thought={selectedThought} onClose={closeReadMore} />
      )}
    </div>
  );
}