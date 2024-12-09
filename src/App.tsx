import { Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Home />
      <Routes></Routes>
    </div>
  );
}

export default App;
