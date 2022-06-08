
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/users/Login";
import UserRegister from "./pages/users/UserRegister";
import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { outerTheme } from "./outerTheme";
// import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import FarmerRegister from './pages/farmers/FarmerRegister'
import FarmlandRegister from "./pages/farmlands/FarmlandRegister";
import Monitorings from './pages/Monitorings'
import FarmersList from "./pages/farmers/FarmersList";
import FarmerExitRegister from "./pages/farmers/FarmerExitRegister";
import FarmlandsList from "./pages/farmlands/FarmlandsList";
import NotFound from "./pages/NotFound";
import FarmlandDivisionRegister from "./pages/farmlands/FarmlandDivisionRegister";

function App() {
  return (
    <div className="container">
      <ThemeProvider theme={outerTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Router>
            <Routes>
              <Route path="/flist" element={<FarmersList />} />
              <Route path="/divisions" element={<FarmlandDivisionRegister />} />
              <Route path="/farmlands" element={<FarmlandRegister />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<UserRegister />} />

              {/**  Parent Route */}
              <Route path="/" element={<Dashboard />} />
              <Route path="farmers" element={<FarmerRegister />} />
              <Route path="farmers/success" element={<FarmerExitRegister />} />

              <Route path="home" element={<Home />} />

              <Route path="farmlands-list" element={<FarmlandsList />} />
              {/* <Route path="monitorings" element={<Monitorings />} /> */}

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </LocalizationProvider>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
