
import React, { useState, Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Navbar from '../../components/Navbar';
import { Box, Fab, Grid, Stack, Table, TableCell, TableRow, Tooltip } from '@mui/material';
import Footer from '../../components/Footer';
import { Navigate, useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import {  useGetFarmlandsQuery } from '../../features/farmlands/farmlandSlice'
import { useGetFarmersQuery } from '../../features/farmers/farmerSlice'

import Spinner from '../../components/Spinner'

const FarmlandsList = ()=> {

    // const [farmlandsList, setFarmlandsList] = useState([])
    const navigate = useNavigate()

    const { data, error, isLoading } = useGetFarmlandsQuery()
        
    const onAddFarmland = ()=>{
        navigate('/')
    }

    const getTreesAverageAge = (divisions)=>{
        let sum = 0;
        divisions.forEach((div)=>{
            sum += div.sowingYear;
        })
        return new Date().getFullYear() - Math.ceil(sum / divisions?.length)
    }

    const getRegistrationDate = (date)=>{
        let newDate = new Date(date).toDateString().split(' ')
        return newDate.slice(1).join(" ")
    }

    if (isLoading) {
        return <Spinner />
    }

  return (
    <Box>
        <Navbar pageDescription={"Pomares"} />
        <Tooltip onClick={onAddFarmland} title="Adicine produtor" sx={{ position: "fixed", bottom: 60, right: 25 }}>
            <Fab  aria-label="add" color="rebecca">
                <Add fontSize='large' color="white" />
            </Fab>
        </Tooltip>
        <List sx={{ marginTop: "45px", width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
            data.map((farmland, key)=>(
            <Box key={farmland._id.toString()}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                primary={
                    <Fragment>
                        <Typography variant="body2" sx={{ fontWeight: 400, fontSize: "11px"}}  >{`${farmland?.farmer?.fullname}`} </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: "gray"}}  >
                            {`${farmland?.farmlandType}`} <span style={{ fontWeight: 400, fontSize: "11px"}} >
                                ({`${farmland.farmer.address.territory}: ${farmland.label}`})</span>
                        </Typography>
                        <Stack direction="row">
                            <Box sx={{ width: "50%"}}>
                                <Typography component="span" variant='body2'> {`Declarada: ${farmland.declaredArea} ha`} </Typography>
                            </Box>
                            <Box sx={{ width: "50%"}}>
                                <Typography component="span" variant='body2'> {`Plantada: ${farmland.actualArea} ha`} </Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row">
                            <Box sx={{ width: "50%"}}>
                                <Typography component="span" variant='body2'> {`Cajueiros: ${farmland.totalTrees}`} </Typography>
                            </Box>
                            <Box sx={{ width: "50%"}}>
                                <Typography component="span" variant='body2'>  {`Idade : `} 
                                 { 

                                 getTreesAverageAge(farmland.divisions)
                                 
                                 } {` anos`} </Typography>
                            </Box>
                        </Stack>
                    </Fragment>
                }
                secondary={
                    <Typography  component="div" sx={{ width: "100%" }}><span style={{textAlign: "rigth", fontSize: "11px"}}>Registo:{`${getRegistrationDate(farmland.createdAt)}`}</span>   <span style={{textAlign: "rigth", fontSize: "11px"}}>{`por ${farmland?.user?.fullname}`}</span></Typography>
                }

                />
            </ListItem>
            <Divider variant="inset" component="li" />
            </Box>
            ))
            }
        </List>
        <Footer />
    </Box>
  );
}


export default FarmlandsList