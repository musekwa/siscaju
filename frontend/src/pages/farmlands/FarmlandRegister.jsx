
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import { clones } from '../../app/clones'
import { plantingTechniques } from '../../app/plantingTechniques'
import { BootstrapButton } from "../../components/Buttons";

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
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import { AddCircle, AddLocation } from "@mui/icons-material";
import Division from "./Division";



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
    gap: "10px",
}))


function FarmlandRegister() {


  const [clone, setClone] = useState("");
  const [inputClone, setInputClone] = useState("");
  const [plantingTechnique, setPlantingTechnique] = useState("");
  const [inputPlantingTechnique, setInputPlantingTechnique] = useState("");
  const [countReload, setCountReload] = useState(0);
  const [divisions, setDivisions] = useState([2]);

  const onAddDivision = (e)=>{

  }
  const onCloseDivision = (e)=>{

  }

 

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const { farmer } = useSelector((state)=>state.farmer)
  const { farmland } = useSelector((state)=>state.farmland)

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


  useEffect(()=>{
    if (!farmer) {
      navigate('/')
    }
  }, [farmer])


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
        marginTop: "45px"
      }}
    >
      <UserStack direction="row" onClick={()=>(true)} sx={{ m: "10px", }}>
          <Avatar sx={{ width: "50px", height: "50px"}} src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
          <Box sx={{ textAlign: "left" }}>
              <Typography variant='body1'>{`${farmer?.fullname}`}</Typography>
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
          <div style={{ padding: "10px 10px 5px 10px" }}>
            <Typography variant="body2">
              Registar divisões deste pomar segundo os anos de plantio dos seus cajueiros.
            </Typography>
          </div>

            {/* Divisions start here! */}
        {/* { divisions  && divisions.map((division, key)=><Division />) } */}
        <Division />

        {/* Add division button */}

         <Stack
            direction="column"
             justifyContent="center"
             alignItems="center"
             onClick={()=>{}}
            sx={{             
                maxWidth: "500px",
                height: "auto", 
                margin: "20px",
                color: "rebeccapurple",}}
          >
              <AddLocation fontSize="large" sx={{   }}   />
              <Typography variant="body2" >Coordenadas<br />geográficas</Typography>
          </Stack>

          <div style={{ padding: "15px 10px 20px 10px" }}>
            <BootstrapButton variant="contained" type="submit">
              Registar Pomar
            </BootstrapButton>
          </div>
        </Box>      
    </Box>
    <Footer />
    </Box>
  );
}

export default FarmlandRegister;
