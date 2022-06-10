
import { Forest, LegendToggle, PersonAdd } from '@mui/icons-material'
import { Box, Divider, Grid, Typography, Zoom } from '@mui/material'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
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

const Dashboard = ({ user }) => {

  const [transition, setTransition] = useState(true)


  // if (!user) {
  //    navigate('/login')
  // }

  // useEffect(()=>{
  //     if (!user) {
  //       navigate('/login')
  //     }
  //     // setTransition((prev)=>!prev)
  // }, [user, navigate, transition])


  return (
    <Box>
      <Navbar pageDescription={"Meu Painel"} user={user} />
    {/* <Zoom in={transition} style={{ transitionDelay: transition ? '500ms': '100ms' }}> */}
        <Box sx={{ flexGrow: 1, marginTop: "45px", marginBottom: "20px", }} >
        <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
          <Grid item xs={4}>
            <Item sx={{}}>        
              <Link to='/farmers' sx={{}}>
                <PersonAdd fontSize="large" sx={{ color: "rebeccapurple" }}  />
                <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Registar<br />Produtor</Typography>
              </Link>
            </Item>
          </Grid>

          <Grid item xs={4} sx={{}}>
            <Item sx={{}}> 
          <Link to='/farmlands' sx={{} }>
            <Forest fontSize="large" sx={{ color: "rebeccapurple" }}  />
            <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Registar<br />Pomar</Typography>
          </Link>
          </Item>
          </Grid>

          <Grid item xs={4} sx={{}}>
            <Item>
          <Link to='/monitorings' sx={{}}>
            <LegendToggle fontSize="large" sx={{ color: "rebeccapurple" }}  />
            <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Monitorar<br />Pomar</Typography>
          </Link>
          </Item>
          </Grid>

          </Grid>
          </Box>
          
          <Divider sx={{}} />

        <Typography variant="body1" sx={{ textAlign: "left", margin: "25px"}}>Desempenho pessoal</Typography>
        <Box sx={{ margin: "25px", }}>
        <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
          <Grid item sx={{ }} xs={4} >
            
          <Link to='/farmers' sx={{}}>
            <Typography variant="body1" sx={{}}>{0}</Typography>
            <Typography variant="body1"sx={{}}>Produtores<br />registados</Typography>
          </Link>
          </Grid>
          <Grid item sx={{  }} xs={4}>
          <Link to='/farmers' sx={{ }} >
            <Typography variant="body1"sx={{}}>{0}</Typography>
            <Typography variant="body1" sx={{}}>Pomares<br />registados</Typography>
          </Link>
          </Grid>

          <Grid item sx={{  }} xs={4}>
          <Link to='/farmers' sx={{}}>
            <Typography variant="body1" sx={{ }}>{0}</Typography>
            <Typography variant="body1" sx={{}}>Pomares<br />Monitorados</Typography>
          </Link>
          </Grid>

          </Grid>
          </Box>

          <Divider sx={{}} />
        <Typography variant="body1" sx={{ textAlign: "left", margin: "25px"}}>Desempenho distrital</Typography>
        <Box sx={{ margin: "25px", }}>
        <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
          <Grid item sx={{ }} xs={4} >
            
          <Link to='/farmers' sx={{}}>
            <Typography variant="body1" sx={{}}>{0}</Typography>
            <Typography variant="body1" sx={{}}>Produtores<br />registados</Typography>
          </Link>
          </Grid>
          <Grid item sx={{  }} xs={4}>
          <Link to='/farmers' sx={{}}>
            <Typography variant="body1" sx={{}}>{0}</Typography>
            <Typography variant="body1" sx={{}}>Pomares<br />registados</Typography>
          </Link>
          </Grid>

          <Grid item sx={{  }} xs={4}>
          <Link to='/farmers' sx={{ }}>
            <Typography variant="body1" sx={{ }}>{0}</Typography>
            <Typography variant="body1" sx={{ }}>Pomares<br />Monitorados</Typography>
          </Link>
          </Grid>

          </Grid>
          </Box>
        {/* </Zoom> */}
        <Footer />

    </Box>
  )
}

export default Dashboard

