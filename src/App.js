import "./App.css";

import Routing from "./routes";
import "./assets/styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routing />
      <ToastContainer
        icon={true}
        theme="colored"
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={true}
        closeButton={false}
        newestOnTop
      />
    </>
  );
}

export default App;
