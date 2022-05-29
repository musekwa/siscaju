
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Register2 from "./pages/Register2"
import Register3 from "./pages/Register3";
import Header from "./components/Header";
import { ThemeProvider } from "@mui/material"
import { outerTheme } from "./outerTheme";
import Navbar from "./components/Navbar";

function App() {
  return (
    <ThemeProvider theme={outerTheme}>
  
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/register2" element={<Register2 />} />
            <Route path="/register3" element={<Register3 />} /> */}
          </Routes>
        </div>
      </Router>
      <ToastContainer /> {/*closeButton={CloseButton} */}
    </ThemeProvider>
  );
}

export default App;
