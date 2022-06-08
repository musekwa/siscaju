
import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar';
import { Box, Fab, Tooltip } from '@mui/material';
import Footer from '../../components/Footer';
import { Add } from '@mui/icons-material';
import { farmers} from '../../fakeData/farmers.js'
import { useNavigate } from 'react-router-dom';

const FarmersList = ()=> {

    const [farmersList, setFarmersList] = useState([])

    const navigate = useNavigate()

    const onAddFarmer = ()=>{
        navigate('/farmers')
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
                farmers.map((farmer, key)=>(
            <Box key={key.toString()}>
            <ListItem alignItems="flex-start" >
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={`${farmer?.fullname} (${farmer.category ? farmer.category : 'desconhecida'})` }
                    secondary={
                        <Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            Ali Connors
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…"}
                        </Fragment>
                    }
                />
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