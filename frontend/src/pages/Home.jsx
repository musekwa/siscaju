import { Box, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <Box>
      <Navbar />
      <Typography>Home</Typography>
      <Stack direction="row" spacing={2} >
        <Item>Produtor</Item>
        <Item>Pomar</Item>
        <Item>Monitoria</Item>
      </Stack>

      <Footer />
    </Box>
  );
};

export default Home;
