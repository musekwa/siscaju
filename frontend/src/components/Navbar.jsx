import {
  AppBar,
  Avatar,
  Box,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  height: "100%",
  
  // backgroundColor: "rebeccapurple",
  // [theme.breakpoints.up("md")]: {
  //   display: "flex",
  //   justifyContent: "space-between",
  // },
}));

//  const StyledToolbar = styled(Toolbar)({
//      display: "flex",
//      justifyContent: "space-between"
//  }

const Icons = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "10px",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));


const Search = styled("div")(({theme})=>({
    backgroundColor: "white",
    padding: "0 10px",
    width: "80%",
    marginLeft: "25px",
    marginRight: "10px",
    borderRadius: theme.shape.borderRadius,
    [theme.breakpoints.up('md')]: {
      width: "40%",
    },
    
}))

const Navbar = ({ pageDescription, user, flag }) => {

  const navigate = useNavigate()

  const onLogout = ()=>{
  //   localStorage.removeItem('user');
  //   navigate('/login')
  }

    const [open, setOpen] = useState(false)


  return (
    <Box  sx={{zIndex: 10, position: "sticky", top: 0, right: 0, left: 0, }}>
    <AppBar  sx={{ height: "60px", backgroundColor: "rebeccapurple",   }}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          SisCaju
        </Typography>


        <Box sx={{width: "100%", textAlign: "center" }}>
        
          <Search>
            <InputBase placeholder="Procurar produtor..." />
          </Search> 
         
          {/* <Typography
            variant="body1"
            fontWeight={100}
            component="p"
          
            sx={{ p: "2px 0px 2px 0px",   }}
          >
            {pageDescription}
          </Typography> */}
        </Box>
        <Tooltip title={`${user?.fullname.split(' ')[0]}`}>
        <Icons onClick={(e) => setOpen(true)}>
          <Avatar
            onClick={() => {}}
            sx={{ width: "40px", height: "40px",  }}
            src=""
          />
        </Icons>
        </Tooltip>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            onClick={() => {}}
            sx={{ width: "40px", height: "40px" }}
            src={`${user?.image}`}
          />
          <Typography variant="body2">{user?.fullname.split(' ')[0]}</Typography>
        </UserBox>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={""}
        open={open}
        onClose={(e) => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => {}}>Minha conta</MenuItem>
        <MenuItem onClick={onLogout}>Terminar a sessão</MenuItem>
        <MenuItem onClick={() => {}}>Configurações</MenuItem>
      </Menu>
    </AppBar>
    // </Box>
  );
};

export default Navbar;
