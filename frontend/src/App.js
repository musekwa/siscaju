
import { Routes, Route, } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/users/Login";
import UserRegister from "./pages/users/UserRegister";
import Home from "./pages/Home";
import FarmerRegister from './pages/farmers/FarmerRegister'
import FarmlandRegister from "./pages/farmlands/FarmlandRegister";
import Monitorings from './pages/Monitorings'
import FarmersList from "./pages/farmers/FarmersList";
import FarmlandsList from "./pages/farmlands/FarmlandsList";
import NotFound from "./pages/NotFound";
import FarmlandDivisionRegister from "./pages/farmlands/FarmlandDivisionRegister";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import FarmlandAdd from "./pages/farmlands/FarmlandAdd";
import Farmer from "./pages/farmers/Farmer";
import Farmland from "./pages/farmlands/Farmland";

function App() {

  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      {/* User Routes */}
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<UserRegister />} />

      {/**  Dashboard */}
      <Route element={<ProtectedRoute user={user} />}>
        <Route path="/" element={<Dashboard user={user} />} />
        <Route path="/farmers" element={<FarmerRegister user={user} />} />
        <Route path="/farmlands" element={<FarmlandRegister user={user} />} />
        <Route path="/divisions" element={<FarmlandDivisionRegister user={user} />} />
        <Route path="/farmers-list" element={<FarmersList user={user} />} />
        <Route path="/farmlands-list" element={<FarmlandsList user={user} />} />
        <Route path="/farmland-add" element={<FarmlandAdd user={user} />} />
        <Route path="/farmers/:farmerId" element={<Farmer user={user} />} />
        <Route path="/farmland" element={<Farmland user={user} />} />
      </Route>

      {/* <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      /> */}

      {/* Farmer Routes */}
      {/* <Route path="farmers" element={<FarmerRegister />} /> */}

      {/* Farmland Routes */}

      {/* Monitoring Routes */}
      {/* <Route path="/flist" element={<FarmersList />} /> */}
      {/* <Route path="/divisions" element={<FarmlandDivisionRegister />} /> */}
      {/* <Route path="/farmlands" element={<FarmlandRegister />} /> */}

      {/* <Route path="farmers/success" element={<FarmerExitRegister />} /> */}

      {/* <Route path="home" element={<Home />} /> */}

      {/* <Route path="farmlands-list" element={<FarmlandsList />} /> */}
      {/* <Route path="monitorings" element={<Monitorings />} /> */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
