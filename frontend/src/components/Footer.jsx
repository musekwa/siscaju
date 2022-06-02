import React, { useState, useEffect, useRef } from 'react'
import {
  Dashboard,
  Forest,
  LegendToggle,
  PersonAdd,
  LocationOn,
  Group,
} from "@mui/icons-material";
import { Avatar, BottomNavigation, BottomNavigationAction, Box, CssBaseline, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import Farmers from '../pages/Farmers';
import Home from '../pages/Home';
import { farmers } from '../fakeData/farmers';
import { farmlands } from '../fakeData/farmlands';
import { Link, useNavigate } from 'react-router-dom'

function refreshMessages() {
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  return Array.from(new Array(50)).map(
    () => messageExamples[getRandomInt(messageExamples.length)]
  );
}



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
  //  if (value === 2) {
  //   setItemList(farmers);
  //  }
  //  else if (value === 3) {
  //   setItemList(farmlands);
  //  }
   
 }, [value, setItemList]);

    console.log('footer')

    const toDashboard = ()=>{
        navigate('/')
    }

    const toFarmersList = ()=>{
      navigate('/farmers-list')
    }

    const toFarmlandsList = ()=>{
      navigate('/farmlands-list')
    }

    const toMonitorings = ()=>{
      navigate('/monitorings')
    }

  return (
    <Box sx={{ pb: 7, display: { xs: "block", sm: "none" } }} ref={ref}>
      <CssBaseline />
    
    {/* { value === 1 ?
       <List>
            {itemList.map(({ primary, secondary, person }, index) => (
              <ListItem button key={index + person}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            ))}
          </List>
      : value === 2 ?
       <List>
            {itemList.map(({ fullname, image, subcategory, phone, birthDate }, index) => (
              <ListItem button key={index + fullname}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={"image"} />
                </ListItemAvatar>
                <ListItemText primary={fullname} secondary={subcategory} />
              </ListItem>
            ))}
          </List>
      : value === 3 ?
       <List>
            {itemList.map(({ primary, secondary, person }, index) => (
              <ListItem button key={index + person}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            ))}
          </List>
      : null      
    } */}
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
          <BottomNavigationAction disabled onClick={toMonitorings} label="Monitoria" icon={<LegendToggle />} />
          <BottomNavigationAction onClick={toFarmersList} label="Produtores" icon={<Group />} />
          <BottomNavigationAction onClick={toFarmlandsList} label="Pomares" icon={<Forest />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

const messageExamples = [
  {
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: "/static/images/avatar/2.jpg",
  },
  {
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: "/static/images/avatar/3.jpg",
  },
  {
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: "/static/images/avatar/4.jpg",
  },
  {
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: "/static/images/avatar/5.jpg",
  },
  {
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: "/static/images/avatar/1.jpg",
  },
];

export default Footer;
