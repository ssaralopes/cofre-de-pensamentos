import { useState } from "react";
import { hashPassword } from "../utils/cryptoUtils";
import { FaGithub } from 'react-icons/fa';

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedHash = localStorage.getItem("vault-password-hash");

    if (!storedHash) {
      // Primeira vez → salva o hash
      const hash = hashPassword(password);
      localStorage.setItem("vault-password-hash", hash);
      onLogin(password);
    } else {
      const hash = hashPassword(password);
      if (hash === storedHash) {
        onLogin(password);
      } else {
        setError("Senha incorreta.");
      }
    }
  };

  return (
    <div className="login-container">
        {/* 🔮 Cartas do Tarô */}
        <div className="card-container">
            <div className="card-tarot">
                <img src={`${process.env.PUBLIC_URL}/img/estrelas.png`}  alt="Carta das Estrelas" />
            </div>
            <div className="card-tarot">
                <img src={`${process.env.PUBLIC_URL}/img/lua.png`} alt="Carta da Lua" />
            </div>
            <div className="card-tarot">
                <img src={`${process.env.PUBLIC_URL}/img/sol.png`} alt="Carta do Sol" />
            </div>
         </div>

         
      <h1 className="page-title">COFRE DE PENSAMENTOS</h1>

        <div className="page-description">
            <p className="description-text">
                <strong>Este é um lugar que não pertence ao mundo lá fora.</strong> Aqui, cada pensamento se 
                torna <strong>semente</strong>, guardado como se fosse uma  
                <strong> relíquia sagrada</strong> da sua própria existência.  
                O <strong>Cofre de Pensamentos</strong> é mais que um espaço — é um 
                <strong>refúgio</strong> para aquilo que <strong>só você entende, sente e deseja guardar</strong>.  
                Seus pensamentos se transformam em <strong>tesouros invisíveis</strong>, protegidos como 
                <strong> fragmentos preciosos da sua própria história</strong>. 
            </p>
            
            <p className="final-invite">
                Bem-vindo. Aqui, suas palavras repousam em segurança, guardadas como relíquias preciosas.
                É sua essência que preenche este espaço. Este cofre agora lhe pertence — e tudo aqui vive, só para você.
            </p>
        </div>

      <form onSubmit={handleSubmit} className="login-form">
        
        <label>
          digite sua senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Entrar</button>
      </form>

      <div className="cofre-meaning">
            <a
            href="https://github.com/ssaralopes"  
            target="_blank"
            rel="noopener noreferrer"
            className="git-button"
            >
            <FaGithub/>
            Visite meu GitHub
            </a>

            <h4>Cofre de Pensamentos: Segurança no Front-End e Memória Criptografada</h4>
            <p>
                <strong>Um templo digital</strong> onde seus pensamentos são guardados sob <strong>chave e criptografia</strong>.
                Desenvolvido em <strong>React</strong>, este cofre aplica <strong>segurança no front-end</strong>: sua <strong>senha mestra</strong> 
                gera um <strong>hash seguro (SHA-256)</strong> e cifra seus pensamentos com <strong>criptografia simétrica (AES)</strong> <br></br>
                <strong>Nada é salvo em texto puro.</strong> Seus segredos vivem <strong>trancados no navegador</strong>, protegidos no 
                <strong>localStorage</strong>, acessíveis apenas a quem conhece a <strong>chave certa</strong>.
            </p>
            <p>
                Que este espaço também inspire uma reflexão: <strong>segurança da informação não é exclusividade do back-end</strong>. 
                <strong>Proteger dados sensíveis começa no ponto mais próximo do usuário.</strong> Neste projeto, <strong>desmistificamos a ideia de que 
                o front é apenas uma vitrine</strong>. Aqui, ele também é <strong>cofre, guardião e sentinela</strong>.
            </p>
       </div>

       <footer className="dedicatoria">
          <p>a todos aqueles que, em silêncio, constroem universos dentro de si.
            que sabem que algumas palavras não foram feitas para o mundo — apenas para si mesmos.</p>
       </footer>
    </div>

    
  );
}
