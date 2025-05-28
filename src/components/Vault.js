import { useEffect, useState } from "react";
import { encryptData, decryptData } from "../utils/cryptoUtils";
import ThoughtModal from "./ThoughtModal";

export default function Vault({ password, onLogout }) {
  const [thoughts, setThoughts] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  return (
    <div className="vault-container">
      <div className="vault-header">
        <h1>📖 Meu Cofre</h1>
        <button onClick={onLogout}>Sair</button>
      </div>

      <div className="thoughts-grid">
        {thoughts.map((t) => (
          <div key={t.id} className="thought-card">
            <p>{t.text}</p>
            <button onClick={() => deleteThought(t.id)}>Excluir</button>
          </div>
        ))}
      </div>

      <button className="add-thought-button" onClick={() => setShowModal(true)}>
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
    </div>
  );
}
