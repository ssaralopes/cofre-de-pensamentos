import { useState } from "react";
import Login from "./components/Login";
import Vault from "./components/Vault";

function App() {
  const [password, setPassword] = useState(null);

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

