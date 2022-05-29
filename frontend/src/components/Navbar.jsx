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
  gap: "20px",
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
  gap: "10px",
  "&:hover": {
    cursor: "pointer",
  },
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const Navbar = () => {

    const [open, setOpen] = useState(false)
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          SisCaju
        </Typography>

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
