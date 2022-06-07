
import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

import  { AddAPhoto, Forest, ArrowBack } from '@mui/icons-material';

const FarmerExitRegister = () => {

  const navigate = useNavigate()
  const { farmer } = useSelector((state)=>state.farmer);


  useEffect(()=>{
    if (!farmer) {
      navigate('/')
    }
  }, [farmer, navigate])

  return (
    <>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "30vh",
      }}>
      <Box  sx={{ border: "2px solid rebeccapurple", width: "250px",  }}>
        { farmer && <Typography variant='body1'>Foi registad{ (farmer.gender === 'M') ? `o o produtor` : `a a produtora` }<Box component="span" sx={{ color: "rebeccapurple", width: "100%"}}> {`${farmer.fullname}`} </Box></Typography> }
      </Box>
      </Box>
      <Box sx={{ height: "30vh" }}>
        <Grid container sx={{  }}>
          <Grid item xs={6} sx={{ }} >
            <Link to={"#"}>
              <AddAPhoto fontSize='large' sx={{color: "rebeccapurple"}} />
              <Typography variant="body2">Capturar Foto <br />deste Produtor</Typography>
             </Link>
          </Grid>
          <Grid item xs={6} sx={{ }}>
            <Link to={"/farmlands"}>
              <Forest fontSize='large'  sx={{color: "rebeccapurple"}} />
              <Typography variant="body2">Adicionar Pomar <br />deste Produtor</Typography>
            </Link>
          </Grid>
        </Grid>
        <Box sx={{ 
          width: "50px",         
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30vh" }}>
          <Link to={"/farmers"}>
            <ArrowBack fontSize='large'  sx={{color: "rebeccapurple"}} />
            <Typography variant="body2">Voltar</Typography>
           </Link>
        </Box>
    </Box>
    </>
    
  )
}

export default FarmerExitRegister