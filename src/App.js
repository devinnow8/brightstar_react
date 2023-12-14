import "./App.css";

import Routing from "./routes";
import "./assets/styles/main.scss";
import { useEffect, useState } from "react";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const [logged, isLogged] = useState(accessToken);

  useEffect(() => {
    const checkLoginStatus = () => {
      isLogged(accessToken !== null);
    };

    checkLoginStatus();
  }, [accessToken]);
  return (
    <>
      <Routing logged={logged} isLogged={isLogged} />
    </>
  );
}

export default App;
