import React, { useState, useEffect, useRef, startTransition } from 'react'
import {
  Dashboard,
  Forest,
  LegendToggle,
  PersonAdd,
  LocationOn,
  Group,
} from "@mui/icons-material";
import { Avatar, BottomNavigation, BottomNavigationAction, Box, CssBaseline, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import Farmers from '../pages/farmers/Farmers';
import Home from '../pages/Home';
import { farmers } from '../fakeData/farmers';
import { farmlands } from '../fakeData/farmlands';
import { Link, useNavigate } from 'react-router-dom'



const styledBottomNavigation = {
  "& .Mui-selected": {
    color: "rebeccapurple",
  },
  "& .MuiIcon-colorAction": {
    color: "rebeccapurple",
    backgroundColor: "rebeccapurple"
  }
}


const Footer = ( ) => {

 const [value, setValue] = useState(0);

 const ref = useRef(null);
 const [itemList, setItemList] =  useState([]) // useState(() => refreshMessages());

 const navigate = useNavigate()
 useEffect(() => {
   ref.current.ownerDocument.body.scrollTop = 0;
   
 }, [value, setItemList]);

    const toDashboard = ()=>{
      startTransition(()=>{
        navigate('/')
      })
    }

    const toFarmersList = ()=>{
      startTransition(()=>{
      navigate('/farmers-list')
    })}

    const toFarmlandsList = ()=>{
      startTransition(()=>{
      navigate('/farmlands-list')
    })}

    const toMonitorings = ()=>{
      startTransition(()=>{
      navigate('/to-be-defined')
    })}

  return (
    <Box sx={{ pb: 7, display: { xs: "block", sm: "none" } }} ref={ref}>
      <CssBaseline />
    
      {/* <Home value={ value} itemList={itemList } /> */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
        sx={styledBottomNavigation}
          showLabels
        //   value={value}
        //   onChange={(event, newValue) => {
        //     setValue(newValue);
        //   }}
        >
          <BottomNavigationAction onClick={toDashboard} label="Painel" icon={<Dashboard sx={{}} />} />
          <BottomNavigationAction onClick={toMonitorings} label="Monitoria" icon={<LegendToggle />} />
          <BottomNavigationAction onClick={toFarmersList} label="Produtores" icon={<Group />} />
          <BottomNavigationAction onClick={toFarmlandsList} label="Pomares" icon={<Forest />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Footer;
