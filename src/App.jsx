import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import Cart from "./components/Cart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="app">
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/cart"
          element={token ? <Cart /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
