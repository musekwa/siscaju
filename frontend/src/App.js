
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import UserRegister from "./pages/UserRegister";
import Register2 from "./pages/Register2"
import Register3 from "./pages/Register3";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material"
import { outerTheme } from "./outerTheme";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FarmerRegister from './pages/FarmerRegister'
import FarmlandRegister from "./pages/FarmlandRegister";
import Monitorings from './pages/Monitorings'
import FarmersList from "./pages/FarmersList";
import FarmlandsList from "./pages/FarmlandsList";

function App() {
  return (
    <ThemeProvider theme={outerTheme}>
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<UserRegister />} />
            <Route path="/farmers-list" element={<FarmersList />} />
            <Route path="/farmlands-list" element={<FarmlandsList />} />
            <Route path="/farmers" element={<FarmerRegister />} />
            <Route path="/farmlands" element={<FarmlandRegister />} />
            <Route path="/monitorings" element={<Monitorings />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer /> {/*closeButton={CloseButton} */}
    </ThemeProvider>
  );
}

export default App;
