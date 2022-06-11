
import React, { useState, Fragment, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar';
import { Box, Fab, ListItemButton, Stack, Tooltip } from '@mui/material';
import Footer from '../../components/Footer';
import { Add } from '@mui/icons-material';
import { farmers} from '../../fakeData/farmers.js'
import { useNavigate } from 'react-router-dom';
import { useGetFarmersQuery } from '../../features/farmers/farmerSlice';
import Spinner from '../../components/Spinner';



const FarmersList = ()=> {

    const [farmersList, setFarmersList] = useState(null)

    let { data, error, isLoading } = useGetFarmersQuery( );

    const navigate = useNavigate()

    const onAddFarmer = ()=>{
        navigate('/farmers')
    }

    if (isLoading) {
        return <Spinner />
    }

  return (
    <Box>
        <Navbar pageDescription={"Produtores"} />
        <Tooltip onClick={onAddFarmer} title="Adicine produtor" sx={{ position: "fixed", bottom: 60, right: 25 }}>
            <Fab  aria-label="add" color="rebecca">
                <Add fontSize='large' color="white" />
            </Fab>
        </Tooltip>
        <List sx={{ marginTop: "45px", width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                data.map((farmer, key)=>(
            <Box key={farmer._id.toString()} >
            <ListItem alignItems="flex-start" >
                {/* <ListItemButton> */}
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary= {
                        <Fragment>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: "gray"}}  >{`${farmer?.fullname}` } <span style={{ fontSize: "12px"}}>{`(${new Date().getFullYear() - new Date (farmer.birthDate).getFullYear()} anos)`}</span></Typography>
                            <Typography component="span" sx={{ fontSize: "11px", }}>{farmer?.category} (em {`${farmer?.address?.territory}`})</Typography>
                        </Fragment>
                    }
                    secondary={
                        <Fragment>
                            <Stack direction="row">
                                <Box sx={{ width: "50%"}}>
                                {`Pomares: ${farmer?.farmlands?.length}`}
                                </Box>
                                <Box sx={{ width: "50%"}}>
                                 {`Cajueiros: ${farmer?.totalTrees}`}
                                </Box>
                            </Stack>
                            <Stack direction="row">
                                <Box sx={{ width: "50%"}}>
                                 <Typography component="div" sx={{ fontSize: "11px", textAlign: "left"}}>{`${farmer.phone ? farmer.phone : "Não tem telefone"}`}</Typography> 
                                </Box>
                               
                            </Stack>

                            <Box sx={{ width: "100%"}}>
                                 <Typography component="div" sx={{ fontSize: "11px", textAlign: "right"}}>{`Registado por ${farmer?.user?.fullname}`}</Typography> 
                              </Box>          
                        </Fragment>
                    }
                />
                {/* </ListItemButton> */}
            </ListItem>
            <Divider variant="inset" component="li" />
            </Box>))
            }
        </List>
        <Footer />
    </Box>
  );
}


export default FarmersList