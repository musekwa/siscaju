
import React from 'react'
import { Backdrop, Box, Button, Fade, Grid, Modal, Typography } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import { AddAPhoto, ArrowBack, Forest } from '@mui/icons-material'

const FarmerRegisterModal = ({ open, setOpen,  farmer }) => {

  const navigate = useNavigate()

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
            p: 4,
            
          }}>

            
              { farmer 
                && 
                <Typography 
                  sx={{ textAlign: "center", width: "250px", mt: 3,  }}
                  id="keep-mounted-modal-title" 
                  variant='body1'
                  >{ (farmer?.gender === 'M') ? `Produtor de caju:` : `Produtora de caju:` }
                      <Box 
                        component="span" 
                        sx={{ color: "rebeccapurple", width: "100%",  display: "block"}}
                        > 
                        {`${farmer?.fullname}`}
                      </Box>
                </Typography> 
              }

          <Typography variant="body2" sx={{ mt: 7, textAlign: "center" }}>
           Adicionar...
          </Typography>
          <Grid container sx={{ mt: 3,  }}>
            <Grid item xs={5} sx={{ textAlign: "left"}} >
              <Button>
                <Box sx={{ textAlign: "center", color: "rebeccapurple"}}>
                  <AddAPhoto fontSize='large' />
                  <Typography variant="body2">Foto</Typography>
                </Box>
              </Button>
            </Grid>
            <Grid item xs={2}>

            </Grid>
            <Grid item xs={5} sx={{ textAlign: "right" }}>
              <Button onClick={()=>{
                navigate('/farmlands')
              }}>
                <Box sx={{ textAlign: "center", color: "rebeccapurple"}}>
                  <Forest fontSize='large'  />
                  <Typography variant="body2">Pomar</Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 7 }}>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button>
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

export default FarmerRegisterModal