
import { Forest, LegendToggle, PersonAdd } from '@mui/icons-material'
import { Box, Divider, Grid, Typography, Zoom } from '@mui/material'
import { styled } from '@mui/system'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import React, { useEffect, useState, useTransition } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import FarmerRegisterModal from '../../components/FarmerRegisterModal.jsx.jsx'
import FarmlandRegisterModal from '../../components/FarmlandRegisterModal'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Spinner from '../../components/Spinner'
import { useGetPerformancesQuery } from '../../features/performance/performanceSlice'

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Dashboard = ({ user }) => {

  const navigate = useNavigate();
  const location = useLocation()
  const [isPending, startTransition] = useTransition();
  // const { user } = location.state;

  // console.log('transported user: ', user)

  const [performance, setPerformance] = useState(null)

  let { 
    data, 
    isLoading, 
    isFetching,
    isSuccess,
    isError}  = useGetPerformancesQuery()




  useEffect(()=>{
    // handleReload()
    const timeId = setTimeout(()=>{
      setPerformance((prevState)=>({
        ...prevState,
        data
      }))
    }, 2000)

    return clearTimeout(timeId);
  }, [location])

  
    // reload once
    // window.onload = function() {
    //   if(!window.location.hash) {
    //     window.location = window.location + '/#loaded';
    //     window.location.reload(true);
    //   }
    // }

  if (isLoading) {
    return <Spinner />
  }



  return (
    <Box >
      { isLoading && <Spinner />}
      <Navbar pageDescription={
        user?.role === 'Gestor' 
        ? user?.address.province 
        : user?.role === 'Extensionista' 
        ? user?.address.district 
        : user?.role === 'Produtor' 
        ? user?.address.territory: null } user={user} />
    {/* <Zoom in={transition} style={{ transitionDelay: transition ? '500ms': '100ms' }}> */}
        <Box sx={{ flexGrow: 1, marginTop: "35px", marginBottom: "20px", }} >
        <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
          <Grid item xs={4}>
            <Item sx={{}}>        
              <Link to='/farmers' >
                <PersonAdd fontSize="large" sx={{ color: "rebeccapurple" }}  />
                <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Registar<br />Produtor</Typography>
              </Link>
            </Item>
          </Grid>

          <Grid item xs={4} sx={{}}>
            <Item sx={{}}> 
          <Link to='/farmland-add' >
            <Forest fontSize="large" sx={{ color: "rebeccapurple" }}  />
            <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Registar<br />Pomar</Typography>
          </Link>
          </Item>
          </Grid>

          <Grid item xs={4} sx={{}}>
            <Item>
          <Link to='/monitorings' >
            <LegendToggle fontSize="large" sx={{ color: "rebeccapurple" }}  />
            <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Monitorar<br />Pomar</Typography>
          </Link>
          </Item>
          </Grid>

          </Grid>
          </Box>
          
          <Divider sx={{}} />

        <Typography variant="body1" sx={{ textAlign: "left", margin: "15px"}}>Desempenho pessoal ({user?.fullname})</Typography>
        <Box sx={{ margin: "15px", }}>
        <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
          <Grid item sx={{ }} xs={4} >
            
          <Link to='/farmers' sx={{}}>
            <Typography variant="body1" sx={{}}>{data?.user?.farmers?.length || 0}</Typography>
            <Typography variant="body1"sx={{}}>Produtores<br />registados</Typography>
          </Link>
          </Grid>
          <Grid item sx={{  }} xs={4}>
          <Link to='/farmers' sx={{ }} >
            <Typography variant="body1"sx={{}}>{data?.user?.farmlands?.length || 0}</Typography>
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
        <Typography variant="body1" sx={{ textAlign: "left", margin: "15px"}}>Desempenho distrital ({user?.address.district})</Typography>
        <Box sx={{ margin: "15px", }}>
        <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
          <Grid item sx={{ }} xs={4} >
            
          <Link to='/farmers' sx={{}}>
            <Typography variant="body1" sx={{}}>{data?.district?.farmers?.length || 0}</Typography>
            <Typography variant="body1" sx={{}}>Produtores<br />registados</Typography>
          </Link>
          </Grid>
          <Grid item sx={{  }} xs={4}>
          <Link to='/farmers' sx={{}}>
            <Typography variant="body1" sx={{}}>{data?.district?.farmlands?.length || 0}</Typography>
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

    { user?.role === 'Gestor' ? 
        (<>
          <Divider sx={{}} />
          <Typography variant="body1" sx={{ textAlign: "left", margin: "15px"}}>Desempenho provincial ({user?.address.province})</Typography>
          <Box sx={{ margin: "15px", }}>
          <Grid container spacing={{ xs: 4, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "space-around"}}>
            <Grid item sx={{ }} xs={4} >
              
            <Link to='/farmers' sx={{}}>
              <Typography variant="body1" sx={{}}>{data?.province?.farmers?.length || 0}</Typography>
              <Typography variant="body1" sx={{}}>Produtores<br />registados</Typography>
            </Link>
            </Grid>
            <Grid item sx={{  }} xs={4}>
            <Link to='/farmers' sx={{}}>
              <Typography variant="body1" sx={{}}>{data?.province?.farmlands?.length || 0}</Typography>
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
        </>)
        : null
      } 

        <Footer />

    </Box>
  )
}

export default Dashboard

