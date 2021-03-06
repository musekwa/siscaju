
import React, { useState, Fragment, useEffect, startTransition } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar';
import NotFound from '../NotFound';
import { Box, Fab, Grid, ListItemButton, Stack, Tooltip } from '@mui/material';
import Footer from '../../components/Footer';
import { Add, AddCircle } from '@mui/icons-material';
import { farmers} from '../../fakeData/farmers.js'
import { Navigate, useNavigate } from 'react-router-dom';
import { useGetFarmersQuery, useGetFarmersByDistrictQuery, useGetFarmersByQuery } from '../../features/farmers/farmerSlice';
import Spinner from '../../components/Spinner';
import SearchModal from '../../components/SearchModal';
import { toast } from 'react-toastify'

const FarmlandAdd = ({ user }) => {


    let filterBy = user?.role === 'Extensionista' 
                ? user?.address?.district 
                : user?.role === 'Gestor' 
                ? user?.address?.province
                : user?.role === 'Produtor'
                ? user?.address?.territory : null;

    const { data, isError, error, isLoading, isFetching } = useGetFarmersByQuery(filterBy);
    const navigate = useNavigate()

    if (isLoading || isFetching) {
        return <Spinner />
    }

    if (data && data.length === 0) {
        toast.warning('Primeiro, regista-se produtores (proprietários) de pomares!',
        {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        })
        navigate('/')
    }


    const onAddFarm = (farmerId)=>{
        let farmer = data.find(farmer => farmer._id === farmerId)
        startTransition(()=>{
            navigate('/farmlands', { state: {farmer: farmer }})
        })
    }

  return (
        <Box>
        <Navbar pageDescription={"Produtores"} isManageSearch={true} isSearchIcon={true} />
        <List sx={{ marginTop: "45px", width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                data && data.map((farmer)=>(
            <Box key={farmer?._id} >
            <ListItem alignItems="flex-start" >
                {/* <ListItemButton> */}
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="" />
                </ListItemAvatar>
                <ListItemText
                    primary= {
                        <Grid container>
                            <Grid item xs={9}>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: "gray"}}  >{`${farmer?.fullname}` } <span style={{ fontSize: "12px"}}>{`(${new Date().getFullYear() - new Date (farmer.birthDate).getFullYear()} anos)`}</span></Typography>
                                <Typography component="span" sx={{ fontSize: "11px", }}>{farmer?.category} (em {`${farmer?.address?.territory}`})</Typography>
                            </Grid>
                            <Grid   item xs={3} sx={{ textAlign: "center", }}>
                                <Box id={farmer?._id} onClick={event=>onAddFarm(farmer?._id)} component="button" sx={{ borderRadius: "10px", width: "100%", border: "none"}} >
                                    <AddCircle fontSize='medium' sx={{ color:'rebeccapurple', mt: .5}} />
                                    <Typography sx={{ fontSize: "11px"}}>Adicionar<br />Pomar</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    }
                    secondary={""}
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            </Box>))
            }
        </List>
        {/* <SearchModal open={false} /> */}
        <Footer />
    </Box>
  )
}

export default FarmlandAdd