import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import GoalForm from '../components/GoalForm';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';


function Dashboard() {

  const navigate = useNavigate();
  const { user } = useSelector((state)=>state.auth);

  console.log('user:', user)

  useEffect(()=>{
    if (!user){
      navigate("/login")
    }
  }, [user, navigate])
  return (
    <>
      <Navbar />
      <Sidebar />

      <Footer />

    </>
  );
}

export default Dashboard