import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { roles } from "../app/roles";
import { provinces } from "../app/provinces";
import { genders } from "../app/genders";
import { districtsByProvince as districts } from "../app/districts";
import { administrativePosts as adminPosts } from "../app/administrativePosts";
import { BootstrapButton } from "../components/Buttons";

import {
  Autocomplete,
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




function FarmerRegister() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
  });
  const [role, setRole] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [gender, setGender] = useState("");
  const [adminPost, setAdminPost] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [inputProvince, setInputProvince] = useState("");
  const [inputDistrict, setInputDistrict] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [inputAdminPost, setInputAdminPost] = useState("");
  const [countReload, setCountReload] = useState(0);

  const { fullname, email, password, password2 } = formData;

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
    if ((province && district) || province) {
      setDistrict("");
    }
  }, [province]);

  useEffect(() => {
    if ((district && adminPost) || district) {
      setAdminPost("");
    }
  }, [district]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  // const onChangeAddress = (e)=>{
  //   setAddress((prevState)=>({
  //     ...prevState,
  //     [e.target.name]: e.target.value.trim(),
  //   }))
  // }

  // validating email
  const validateEmail = (email) => {
    const pattern =
      /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === false) {
      // if the email is invalid
      return true;
    }
    // if the email is valid
    return false;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (fullname.split(" ").length < 2) {
      toast.error("Nome deve ser completo", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (validateEmail(email)) {
      toast.error("Email inválido", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (password !== password2) {
      toast.error("Password não corresponde", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    if (
      !role ||
      (role !== "Extensionista" && role !== "Produtor" && role !== "Gestor")
    ) {
      toast.error("Perfil inválido", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const userData = {
      fullname,
      email,
      password,
      role,
    };
    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
      <Box>
          <Navbar pageDescription={'Novo Produtor'} />

    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
    
      {/* <Paper
        sx={{
          maxWidth: "500px",
          height: "auto",
          textAlign: "center",
          mb: "5px",
        }}
      > */}

        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <Paper
            sx={{
            maxWidth: "500px",
            height: "auto",
            textAlign: "center",
            m: "5px",
            }}
        >  
          <div style={{ padding: "10px 10px 10px 10px" }}>
            <TextField
              sx={styledTextField}
              required
              fullWidth
              label="Nome completo"
              id="fullWidth fullname"
              name="fullname"
              type="text"
              placeholder="Nome completo"
              size="small"
              onChange={onChange}
              // value={fullname}
            />
          </div>


          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >

            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo"
                value={gender}
                options={genders}
                onChange={(event, newGender) => {
                  setGender(newGender);
                }}
                inputValue={inputGender}
                onInputChange={(event, newInputGender) => {
                  setInputGender(newInputGender);
                }}
                renderInput={(params) => (
                  <TextField sx={styledTextField} name="gender" {...params} required label="Gênro" />
                )}
              />
            </div>

            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
                <TextField
                    id="date"
                    size="small"
                    label="Data de Nascimento"
                    type="date"
                    name="birthDate"
                    fullWidth
                    defaultValue="2017-05-27"
                    sx={styledTextField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </div>
          </Stack>
        </Paper>
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
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            
            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo"
                // value={province}
                options={provinces}
                onChange={(event, newProvince) => {
                  setProvince(newProvince);
                }}
                inputValue={inputProvince}
                onInputChange={(event, newInputProvince) => {
                  setInputProvince(newInputProvince);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={styledTextField}
                    name="province"
                    {...params}
                    label="Província"
                    required
                    helperText="Nascimento"
                  />
                )}
              />
            </div>

            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo"
                value={district}
                options={
                  province
                    ? districts[province]
                    : ["Selecciona primeiro a província"]
                }
                onChange={(event, newDistrict) => {
                  setDistrict(newDistrict);
                }}
                inputValue={inputDistrict}
                onInputChange={(event, newInputDistrict) => {
                  setInputDistrict(newInputDistrict);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={styledTextField}
                    name="district"
                    {...params}
                    label="Distrito"
                    required
                    helperText="Nascimento"
                  />
                )}
              />
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo"
                value={adminPost}
                options={
                  district
                    ? adminPosts[district]
                    : ["Selecciona primeiro o distrito"]
                }
                onChange={(event, newAdminPost) => {
                  setAdminPost(newAdminPost);
                }}
                inputValue={inputAdminPost}
                onInputChange={(event, newInputAdminPost) => {
                  setInputAdminPost(newInputAdminPost);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={styledTextField}
                    name="adminPost"
                    {...params}
                    label="Posto Admin"
                    helperText="Nascimento"
                  />
                )}
              />
            </div>
            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
              <TextField
                sx={styledTextField}
                fullWidth
                label="Localidade"
                id="fullWidth vaillage"
                name="village"
                type="text"
                placeholder="Localidade"
                helperText="Nascimento"
                size="small"
                onChange={onChange}
              />
            </div>
          </Stack>
        </Paper>
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
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo"
                value={adminPost}
                options={
                  district
                    ? adminPosts[district]
                    : ["Selecciona primeiro o distrito"]
                }
                onChange={(event, newAdminPost) => {
                  setAdminPost(newAdminPost);
                }}
                inputValue={inputAdminPost}
                onInputChange={(event, newInputAdminPost) => {
                  setInputAdminPost(newInputAdminPost);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={styledTextField}
                    name="adminPost"
                    {...params}
                    label="Posto Admin"
                    helperText="residência"
                  />
                )}
              />
            </div>
            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
              <TextField
                sx={styledTextField}
                fullWidth
                label="Localidade"
                id="fullWidth village"
                name="village"
                type="text"
                placeholder="Localidade"
                helperText="Nascimento"
                size="small"
                onChange={onChange}
              />
            </div>
          </Stack>
            <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
                <TextField
                sx={styledTextField}
                fullWidth
                label="Telefone"
                id="fullWidth phone"
                name="phone"
                type="number"
                placeholder="Telefone"
                size="small"
                onChange={onChange}
                />
            </div>
        </Paper>
          <div style={{ padding: "15px 10px 20px 10px" }}>
            <BootstrapButton variant="contained" type="submit">
              Registar Produtor
            </BootstrapButton>
          </div>
        </Box>
      {/* </Paper> */}
      
    </Box>
    <Footer />
    </Box>
  );
}

export default FarmerRegister;
