import {
  AppBar,
  Avatar,
  Box,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  backgroundColor: "rebeccapurple",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

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
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = ({ pageDescription }) => {

    const [open, setOpen] = useState(false)
  return (
    <AppBar  sx={{ width: "100%", position:"sticky", top: 0, right: 0 }}>
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          SisCaju
        </Typography>
        <Box sx={{ width: "100%", textAlign: "center",}}>
        <Typography
          variant="body1"
          fontWeight={100}
          component="p"
         
          sx={{ p: "2px 0px 2px 0px",  }}
        >
          {pageDescription}
        </Typography>
        </Box>
        <Icons onClick={(e) => setOpen(true)}>
          <Avatar
            onClick={() => {}}
            sx={{ width: "30px", height: "30px" }}
            src=""
          />
        </Icons>
        <UserBox onClick={(e) => setOpen(true)}>
          <Avatar
            onClick={() => {}}
            sx={{ width: "30px", height: "30px" }}
            src=""
          />
          <Typography variant="body2">Evariste</Typography>
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
        <MenuItem onClick={() => {}}>Terminar a sessão</MenuItem>
        <MenuItem onClick={() => {}}>Configurações</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
