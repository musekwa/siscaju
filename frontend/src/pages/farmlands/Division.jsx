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

import { AddCircle, Clear, Close, Delete, Save, Send } from "@mui/icons-material";


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

const Division = () => {


  const [clone, setClone] = useState("");
  const [inputClone, setInputClone] = useState("");
  const [plantingTechnique, setPlantingTechnique] = useState("");
  const [inputPlantingTechnique, setInputPlantingTechnique] = useState("");
  const [countReload, setCountReload] = useState(0);
  const [divisions, setDivisions] = useState([]);

  const onAddDivision = (e)=>{

  }
  const onCloseDivision = (e)=>{

  }

 

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
    <Paper
            sx={{
            maxWidth: "500px",
            height: "auto",
            textAlign: "center",
            margin: "10px 5px 5px 5px",
            pt: "5px",
            }}
        >  
        {/* <Grid container>
            <Grid item xs={11} >
                <Typography variant="body1">1<sup>a</sup> divisão</Typography>
            </Grid>
            <Grid item xs={1}  >
                <Close onClick={()=>{}} fontSize="small" sx={{ color: "gray"}} />
            </Grid>
        </Grid> */}
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
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
        />
        </div>


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
           {plantingTechnique === 'enxertia' ? <div style={{ width: "100%", padding: "10px 10px 10px 10px" }}>
              {/* <Autocomplete
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
              /> */}
            <Autocomplete
                multiple
                id="tags-outlined"
                options={clones}
                getOptionLabel={(clone) => clone}
                defaultValue={[]}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Tipos de clones"
                    placeholder="Selecciona clone"
                    sx={styledTextField}
                />
                )}
            />
            </div> : null
            }
            <Stack
                direction="row"
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <div style={{ width: "50%", padding: "10px 10px 10px 10px" }}>
                <BootstrapButton sx={{ width: "100%", backgroundColor: "white", color: "gray"}} variant="contained" startIcon={<Clear />}>
                    Apagar
                </BootstrapButton></div>
                <div style={{ width: "50%", padding: "10px 10px 10px 10px" }}>
                <BootstrapButton sx={{ width: "100%", }} variant="contained" startIcon={<Save />}>
                    Salvar
                </BootstrapButton></div>
            </Stack>
        </Paper> 
  )
}

export default Division