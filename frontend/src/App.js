
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/users/Login";
import UserRegister from "./pages/users/UserRegister";
import Home from "./pages/Home";
import FarmerRegister from "./pages/farmers/FarmerRegister";
import FarmlandRegister from "./pages/farmlands/FarmlandRegister";
import Monitorings from "./pages/Monitorings";
import FarmersList from "./pages/farmers/FarmersList";
import FarmlandsList from "./pages/farmlands/FarmlandsList";
import NotFound from "./pages/NotFound";
import FarmlandDivisionRegister from "./pages/farmlands/FarmlandDivisionRegister";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import FarmlandAdd from "./pages/farmlands/FarmlandAdd";
import Farmer from "./pages/farmers/Farmer";
import Farmland from "./pages/farmlands/Farmland";

import React, { Suspense, lazy, useEffect, useState, } from 'react';
import { Routes, Route, useLocation, } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useUserByIdQuery } from "./features/auth/userSlice";

// import Dashboard from "./pages/Dashboard";
const Dashboard = lazy(()=>import("./pages/dashboard/Dashboard"));


function App() {

  const location = useLocation()
  
  // const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  // const { state} = useSelector((state)=>state)
  // const { data: user } = useUserByIdQuery()

  // const [user, setUser] = useState(null);

  // useEffect(()=>{

  //   if (location?.state) {
  //     const { user: newUser } = location.state
  //     setUser(newUser)
  //     localStorage.setItem("user", JSON.stringify(newUser));
  //     return ;
  //   }

  // }, [user, location])

  return (
    <>
      <Suspense
        fallback={
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center ",
              width: "100%",
              height: "90vh",
              backgroundColor: "gray"
            }}
          >
            <Typography>Carregando...</Typography>
          </Box>
        }
      >
        <Routes>
          {/* User Routes */}
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<UserRegister />} />

          {/**  Dashboard */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/farmers" element={<FarmerRegister user={user} />} />
            <Route
              path="/farmlands"
              element={<FarmlandRegister user={user} />}
            />
            <Route
              path="/divisions"
              element={<FarmlandDivisionRegister user={user} />}
            />
            <Route path="/farmers-list" element={<FarmersList user={user} />} />
            <Route
              path="/farmlands-list"
              element={<FarmlandsList user={user} />}
            />
            <Route path="/farmland-add" element={<FarmlandAdd user={user} />} />
            <Route path="/farmer" element={<Farmer user={user} />} />
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
      </Suspense>
    </>
  );
}

export default App;
