import { useState, useEffect } from "react";
import Login from "./components/Login";
import Vault from "./components/Vault";

function App() {
  const [password, setPassword] = useState(null);
   useEffect(() => {
    if (password) {
      document.body.classList.add("vault-body");
    } else {
      document.body.classList.remove("vault-body");
    }
  }, [password]);

  return (
    <>
      {!password ? (
        <Login onLogin={setPassword} />
      ) : (
        <Vault
          password={password}
          onLogout={() => setPassword(null)}
        />
      )}
    </>
  );
}

export default App;

