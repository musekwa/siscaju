import { Forest, LegendToggle, PersonAdd } from "@mui/icons-material";
import { Box, Divider, Paper, Stack, styled, Typography } from "@mui/material";
import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <Box sx={{ width: "100%"}}>
      <Navbar />
     <Box>
      {/* <Box sx={{ maxWidth: "960px", display: "flex", justifyContent: "center"}}> */}
      <Stack direction="row"  spacing={{ xs: 2, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "center", marginTop: "40px", }} >
        <Item component="a" href="#adicionar-produtor">
          <PersonAdd fontSize="large" sx={{ color: "rebeccapurple" }}  />
          <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Adicionar<br />Produtor</Typography>
        </Item>
        <Item component="a" href="#adicionar-produtor">
          <Forest fontSize="large" sx={{ color: "rebeccapurple" }} />
         <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Registar<br />Pomar</Typography>
        </Item>
        <Item component="a" href="#adicionar-produtor">
          <LegendToggle fontSize="large" sx={{ color: "rebeccapurple" }}  />
          <Typography variant="body1" sx={{ color: "rebeccapurple" }}>Monitorar<br />Pomar</Typography>
        </Item>
      </Stack>
      {/* </Box> */}

      <Divider sx={{ marginTop: "40px"  }} />
      {/* <Box sx={{ maxWidth: "960px", display: "flex", justifyContent: "center", textAlign: "center"}}> */}
      <Stack direction="row"  sx={{ display: "flex", justifyContent: "space-around",  marginTop: "10px"  }} >
        <Typography variant="body1">Desempenho pessoal</Typography>
         <Typography component="a" hrf="#desempenho-pessoal" variant="body2" sx={{ color: "rebeccapurple" }} >ver mais</Typography>
      </Stack>
      <Stack direction="row" spacing={{ xs: 2, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "center", }} >
        <Item component="a" href="#adicionar-produtor">
          <Typography sx={{  }} >{0}</Typography>
          <Typography variant="body1" sx={{ }}>Produtores<br />registados</Typography>
        </Item>
        <Item component="a" href="#adicionar-pomar">
           <Typography sx={{  }} >{0}</Typography>
         <Typography variant="body1" sx={{  }}>Pomares<br />registados</Typography>
        </Item>
        <Item component="a" href="#monitorar-pomar">
           <Typography sx={{  }} >{0}</Typography>
          <Typography variant="body1" sx={{  }}>Pomares<br />monitorados</Typography>
        </Item>
      </Stack>
      {/* </Box> */}

      <Divider sx={{ marginTop: "40px", display: "flex", justifyContent: "center"  }} />
      {/* <Box sx={{ maxWidth: "960px"}}> */}
      <Stack direction="row"  sx={{ display: "flex", justifyContent: "space-around",  marginTop: "10px"  }} >
        <Typography variant="body1">Desempenho distrital</Typography>
         <Typography component="a" hrf="#desempenho-distrital" variant="body2" sx={{ color: "rebeccapurple" }} >ver mais</Typography>
      </Stack>
      <Stack direction="row"  spacing={{ xs: 2, sm: 6, md: 8 }} sx={{ display: "flex", justifyContent: "center", }} >
        <Item component="a" href="#adicionar-produtor">
          <Typography sx={{  }} >{0}</Typography>
          <Typography variant="body1" sx={{ }}>Produtores<br />registados</Typography>
        </Item>
        <Item component="a" href="#adicionar-produtor">
           <Typography sx={{  }} >{0}</Typography>
         <Typography variant="body1" sx={{  }}>Pomares<br />registados</Typography>
        </Item>
        <Item component="a" href="#adicionar-produtor">
           <Typography sx={{  }} >{0}</Typography>
          <Typography variant="body1" sx={{  }}>Pomares<br />monitorados</Typography>
        </Item>
      </Stack>
      {/* </Box> */}
      </Box>
      <Footer />
    </Box>
  );
};

export default Home;
