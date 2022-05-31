
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { roles } from "../app/roles";
import { provinces } from "../app/provinces";
import { genders } from "../app/genders";
import { clones } from '../app/clones'
import { plantingTechniques } from '../app/plantingTechniques'
import { districtsByProvince as districts } from "../app/districts";
import { administrativePosts as adminPosts } from "../app/administrativePosts";
import { BootstrapButton } from "../components/Buttons";

import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
// import { LockOpen } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AdapterDateFns, LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Add, AddCircle, Close } from "@mui/icons-material";


// const RegisterUI = styled('div')(({ theme })=>({

//   [theme.breakpoints.down('sm')]: {

//   }

// })

const styledTextField = {
  "& label.Mui-focused": {
    color: "rebeccapurple"
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "rebeccapurple"
    }
  }
}

const UserStack = styled(Stack)(({theme})=>({
    // display: "flex",
    gap: "10px",
    // [theme.breakpoints.up("sm")]: {
    //     display: "none"
    // }
}))


function FarmlandRegister() {


  const [clone, setClone] = useState("");
  const [inputClone, setInputClone] = useState("");
  const [plantingTechnique, setPlantingTechnique] = useState("");
  const [inputPlantingTechnique, setInputPlantingTechnique] = useState("");
  const [countReload, setCountReload] = useState(0);

 

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toastId = useRef(null);

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (isSuccess && !user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  useEffect(() => {
    // if ((province && district) || province) {
    //   setDistrict("");
    // }
  }, []);

  useEffect(() => {
    // if ((district && adminPost) || district) {
    //   setAdminPost("");
    // }
  }, []);

  const onChange = (e) => {
    // setFormData((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value.trim(),
    // }));
  };

  // const onChangeAddress = (e)=>{
  //   setAddress((prevState)=>({
  //     ...prevState,
  //     [e.target.name]: e.target.value.trim(),
  //   }))
  // }

  // validating email
//   const validateEmail = (email) => {
//     const pattern =
//       /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
//     const result = pattern.test(email);
//     if (result === false) {
//       // if the email is invalid
//       return true;
//     }
//     // if the email is valid
//     return false;
//   };

  const onSubmit = (e) => {
    e.preventDefault();

    // if (fullname.split(" ").length < 2) {
    //   toast.error("Nome deve ser completo", {
    //     autoClose: 5000,
    //     position: toast.POSITION.TOP_RIGHT,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return;
    // }
    // if (validateEmail(email)) {
    //   toast.error("Email inválido", {
    //     autoClose: 5000,
    //     position: toast.POSITION.TOP_RIGHT,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return;
    // }
    // if (password !== password2) {
    //   toast.error("Password não corresponde", {
    //     autoClose: 5000,
    //     position: toast.POSITION.TOP_RIGHT,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return;
    // }
    // if (
    //   !role ||
    //   (role !== "Extensionista" && role !== "Produtor" && role !== "Gestor")
    // ) {
    //   toast.error("Perfil inválido", {
    //     autoClose: 5000,
    //     position: toast.POSITION.TOP_RIGHT,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   return;
    // }

    // const userData = {
    //   fullname,
    //   email,
    //   password,
    //   role,
    // };
    // dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
      <Box>
          <Navbar pageDescription={'Novo Pomar'} />
          
    {/* Farmland owner name and picture */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
    <UserStack direction="row" onClick={()=>(true)} sx={{ m: "10px", }}>
        <Avatar sx={{ width: "50px", height: "50px"}} src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Box sx={{ textAlign: "left" }}>
            <Typography variant='body1'>Evariste Musekwa Iguna</Typography>
            <Typography variant='body2'>(Subcategoria Indefinida)</Typography>
        </Box>
    </UserStack>

    </Box>

    {/* Farmland field names */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >


        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <Paper
            sx={{
            maxWidth: "500px",
            height: "auto",
            textAlign: "center",
            m: "5px",
            }}
        >  

    <Stack             
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{  padding: "10px 10px 10px 10px" }}>
            <TextField
            sx={styledTextField}
            fullWidth
            label="Área declarada"
            id="fullWidth "
            name="declaredArea"
            type="number"
            placeholder="Área (hectares)"
            size="small"
            onChange={onChange}
            />
        </div>

        <div style={{ padding: "10px 10px 10px 10px" }}>
        <TextField
            sx={styledTextField}
            required
            fullWidth
            label="Localização geográfica "
            id="fullWidth"
            name="label"
            type="text"
            placeholder="Localização geográfica "
            size="small"
            onChange={onChange}
            // value={fullname}
        />
        </div>
        </Stack>
        </Paper>

            {/* Divisions start here! */}
        <Paper
            sx={{
            maxWidth: "500px",
            height: "auto",
            textAlign: "center",
            margin: "10px 5px 5px 5px",
            pt: "5px",
            }}
        >  
        <Grid container>
            <Grid item xs={11} >
                <Typography variant="body1">1<sup>a</sup> divisão</Typography>
            </Grid>
            <Grid item xs={1}  >
                <Close fontSize="small" sx={{ color: "gray"}} />
            </Grid>
        </Grid>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
        <div style={{ padding: "10px 10px 10px 10px" }}>
        <TextField
            sx={styledTextField}
            required
            fullWidth
            label="Número de cajueiros"
            id="fullWidth"
            name="trees"
            type="number"
            placeholder="Número de cajueiros"
            size="small"
            onChange={onChange}
            // value={fullname}
        />
        </div>
            
        <div style={{ padding: "10px 10px 10px 10px" }}>
        <TextField
            sx={styledTextField}
            required
            fullWidth
            label="Ano de plantio"
            id="fullWidth"
            name="sowingYear"
            type="number"
            placeholder="Ano de plantio"
            size="small"
            onChange={onChange}
            // value={fullname}
        />
        </div>
        </Stack>
        <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
        >
            <div style={{ width: "50%", padding: "10px 10px 10px 10px" }}>
                <TextField
                sx={styledTextField}
                fullWidth
                label="Área plantada"
                id="fullWidth"
                name="actualArea"
                type="number"
                placeholder="Área (hectares)"
                size="small"
                onChange={onChange}
                />
            </div>
          <Stack
            direction="row"
            sx={{ width: "50%", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ width: "45%", padding: "10px 2px 10px 10px" }}>
            <TextField
                sx={styledTextField}
                fullWidth
                label="Compasso"
                id="fullWidth"
                name="x"
                type="number"
                placeholder=""
                size="small"
                onChange={onChange}
                // value={fullname}
            />
            </div>
            <Typography variant="body2">por</Typography>
            <div style={{ width: "45%", padding: "10px 10px 10px 2px" }}>
                <TextField
                    sx={styledTextField}
                    fullWidth
                    label="Compasso"
                    id="fullWidth"
                    name="y"
                    type="number"
                    placeholder=""
                    size="small"
                    onChange={onChange}
                    // value={fullname}
                />
            </div>
          </Stack>
        </Stack>

          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ width: "50%", padding: "10px 10px 10px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo"
                value={clone}
                options={clones}
                onChange={(event, newClone) => {
                  setClone(newClone);
                }}
                inputValue={inputClone}
                onInputChange={(event, newInputClone) => {
                  setInputClone(newInputClone);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={styledTextField}
                    name="seedlingTypes"
                    {...params}
                    label="Tipo de clone"
                  />
                )}
              />
            </div>
            <div style={{ width: "50%", padding: "10px 10px 10px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo"
                value={plantingTechnique}
                options={
                  plantingTechniques
                }
                onChange={(event, newPlantingTechnique) => {
                  setPlantingTechnique(newPlantingTechnique);
                }}
                inputValue={inputPlantingTechnique}
                onInputChange={(event, newInputPlantingTechnique) => {
                  setInputPlantingTechnique(newInputPlantingTechnique);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={styledTextField}
                    name="plantingTechnique"
                    {...params}
                    label="Tipo de plantios"
                  />
                )}
              />
            </div>
          </Stack>
        </Paper>



          <Stack
            direction="column"
             justifyContent="center"
             alignItems="center"
             onClick={()=>{}}
            sx={{             
                maxWidth: "500px",
                height: "auto", 
                margin: "15px",
                color: "rebeccapurple",}}
          >
              <AddCircle fontSize="large" sx={{   }}   />
              <Typography variant="body2" >Próxima<br />divisão</Typography>
          </Stack>

          <div style={{ padding: "15px 10px 20px 10px" }}>
            <BootstrapButton variant="contained" type="submit">
              Registar Pomar
            </BootstrapButton>
          </div>
        </Box>
     {/* </Paper>  */}
      
    </Box>
    <Footer />
    </Box>
  );
}

export default FarmlandRegister;
