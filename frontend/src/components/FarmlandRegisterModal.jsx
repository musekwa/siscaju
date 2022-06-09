
import React from 'react'
import { Backdrop, Box, Button, Fade, Grid, Modal, Typography } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { AddAPhoto, AddLocation, ArrowBack, Forest } from '@mui/icons-material'

const FarmlandRegisterModal = ({ open, setOpen,  farmer, farmland, farmlandDivision }) => {

  const navigate = useNavigate();

  return (
    <Modal
        keepMounted
        open={open}
        onClose={(event)=>setOpen(false)}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <Box sx={ {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: "300px",
            height: "70vh",
            bgcolor: 'background.paper',
            border: '2px solid rebeccapurple',
            boxShadow: 24,
            p: 1,
          }}>
             <br />
            
              { (farmer && !farmlandDivision) &&
                <Typography 
                  sx={{ textAlign: "center"  }}
                  id="keep-mounted-modal-title" 
                  variant='body1'
                  >Pomar de <Box component="span" style={{ color: "rebeccapurple", width: "100%"}}> {`${farmer?.fullname}`}</Box> localizado
                 <span style={{ color: "rebeccapurple"}}> {`${farmland?.label}`}</span>!
                </Typography> 
              }

              { (farmer && farmlandDivision) &&
                <Typography 
                  sx={{ textAlign: "center", }}
                  id="keep-mounted-modal-title" 
                  variant='body1'
                  >Pomar de <Box component="span" style={{ color: "rebeccapurple", width: "100%", }}> {`${farmer?.fullname}`}</Box> localizado
                 <span style={{ color: "rebeccapurple"}}> {`${farmland?.label}`}</span>!
                </Typography> 
              }

          <Typography variant="body2" sx={{ mt: 7, textAlign: "center" }}>
           Adicionar...
          </Typography>
          <Grid container sx={{ mt: 3,  }}>
            <Grid item xs={6} sx={{ textAlign: "left"}} >
              <Button onClick={()=>{
                navigate('/divisions')
                setOpen(false)
              }}>
                <Box sx={{ textAlign: "center",  color: "rebeccapurple"}}>
                  <Forest fontSize='large' />
                  <Typography variant="body2">Outra divisão</Typography>
                </Box>
              </Button>
            </Grid>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={5} sx={{ textAlign: "right" }}>
              <Button onClick={()=>{
                // setOpen(false)
              }}>
                <Box sx={{ textAlign: "center", color: "rebeccapurple"}}>
                    <AddLocation fontSize="large"  />
                    <Typography variant="body2" >Coordenadas</Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 7 }}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button onClick={()=>{
                navigate('/')
                setOpen(false)
              }}>
                <Box sx={{ color: "rebeccapurple"}}>
                  <ArrowBack fontSize='large'  />
                  <Typography variant="body2">Voltar</Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Box>
        </Fade>
      </Modal>
  )
}

export default FarmlandRegisterModal