
import { Forest, LegendToggle, PersonAdd } from '@mui/icons-material'
import { Box, Divider, Grid, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import FarmerRegisterModal from '../components/FarmerRegisterModal.jsx'
import FarmlandRegisterModal from '../components/FarmlandRegisterModal'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {

  const navigate = useNavigate()
  const { user } = useSelector((state)=>state.auth)

  useEffect(()=>{
      if (!user) {
        navigate('/login')
      }
  }, [user, navigate])


  return (
    <Box>
      <Navbar pageDescription={"Meu Painel"} user={user} />

      <Box sx={{ flexGrow: 1, marginTop: "45px", marginBottom: "20px", }} >
      <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
        <Grid item xs={4}>
          <Item>        
            <Link to='/farmers' >
              <PersonAdd fontSize="large" sx={{ color: "rebeccapurple" }}  />
              <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Registar<br />Produtor</Typography>
            </Link>
          </Item>
        </Grid>

        <Grid item xs={4}>
          <Item> 
        <Link to='/farmlands' >
          <Forest fontSize="large" sx={{ color: "rebeccapurple" }}  />
          <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Registar<br />Pomar</Typography>
        </Link>
        </Item>
        </Grid>

        <Grid item xs={4}>
          <Item>
        <Link to='/monitorings' >
          <LegendToggle fontSize="large" sx={{ color: "rebeccapurple" }}  />
          <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Monitorar<br />Pomar</Typography>
        </Link>
        </Item>
        </Grid>

        </Grid>
        </Box>
        
        <Divider />

      <Typography variant="body1" sx={{ textAlign: "left", margin: "25px"}}>Desempenho pessoal</Typography>
      <Box sx={{ margin: "25px", }}>
      <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
        <Grid item sx={{ }} xs={4} >
          
        <Link to='/farmers' >
          <Typography variant="body1">{0}</Typography>
          <Typography variant="body1">Produtores<br />registados</Typography>
        </Link>
        </Grid>
        <Grid item sx={{  }} xs={4}>
        <Link to='/farmers' >
          <Typography variant="body1">{0}</Typography>
          <Typography variant="body1">Pomares<br />registados</Typography>
        </Link>
        </Grid>

        <Grid item sx={{  }} xs={4}>
        <Link to='/farmers' >
          <Typography variant="body1">{0}</Typography>
          <Typography variant="body1">Pomares<br />Monitorados</Typography>
        </Link>
        </Grid>

        </Grid>
        </Box>

        <Divider />
      <Typography variant="body1" sx={{ textAlign: "left", margin: "25px"}}>Desempenho distrital</Typography>
      <Box sx={{ margin: "25px", }}>
      <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
        <Grid item sx={{ }} xs={4} >
          
        <Link to='/farmers' >
          <Typography variant="body1">{0}</Typography>
          <Typography variant="body1">Produtores<br />registados</Typography>
        </Link>
        </Grid>
        <Grid item sx={{  }} xs={4}>
        <Link to='/farmers' >
          <Typography variant="body1">{0}</Typography>
          <Typography variant="body1">Pomares<br />registados</Typography>
        </Link>
        </Grid>

        <Grid item sx={{  }} xs={4}>
        <Link to='/farmers' >
          <Typography variant="body1">{0}</Typography>
          <Typography variant="body1">Pomares<br />Monitorados</Typography>
        </Link>
        </Grid>

        </Grid>
        </Box>
        <Footer />

    </Box>
  )
}

export default Dashboard

