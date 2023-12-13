import { Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage";

function Router() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default Router;
