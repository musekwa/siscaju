import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import { roles } from "../../app/roles";
import { provinces } from "../../app/provinces";
import { genders } from "../../app/genders";
import { districtsByProvince as districts } from "../../app/districts";
import { administrativePosts as adminPosts } from "../../app/administrativePosts";
import { BootstrapButton } from "../../components/Buttons";
import { useRegisterMutation } from "../../features/auth/userSlice";

import {
  Autocomplete,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";



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




function UserRegister() {
  
  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    password: "",
    password2: "",
    gender: "",
    role: "",
    phone: "",
    address: {
      province: "",
      district: "",
      territory: ""
    }
  });
  // const [role, setRole] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  // const [gender, setGender] = useState("");
  const [territory, setTerritory] = useState("");
  const [inputRole, setInputRole] = useState("");
  const [inputProvince, setInputProvince] = useState("");
  const [inputDistrict, setInputDistrict] = useState("");
  const [inputGender, setInputGender] = useState("");
  const [inputTerritory, setInputTerritory] = useState("");
  const [countReload, setCountReload] = useState(0);

  const { fullname, email, password, password2, gender, role, phone, address } = userData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // const [register, result] = useRegisterMutation();

  // const { data: user, isLoading, isError, error, isSuccess, isUninitialized } = result;

  // console.log('result: ', result)

  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toastId = useRef(null);


  // useEffect(() => {
  //   if (isError || error) {
  //     // let errorMessage = message ? message : 'O registo falhou'
  //     toast.error(error, {
  //       autoClose: 5000,
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   } else if (isSuccess) {
  //       toast.success(`Ol?? ${user?.fullname.split(" ")[0]}, Bem-vindo a SisCaju!`, {
  //       autoClose: 5000,
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //     navigate("/", { state: { user }});
      
  //   }
  //   dispatch(reset());
  // }, [user, isError, isSuccess, error, navigate, dispatch]);


  useEffect(() => {
    if (isError) {
      // let errorMessage = message ? message : 'O registo falhou'
      toast.error(message, {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (isSuccess && user?.fullname) {
        toast.success(`Ol?? ${user?.fullname.split(" ")[0]}, Bem-vindo a SisCaju!`, {
        autoClose: 5000,
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/", {state: { user }});
      
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);



  useEffect(() => {
    if ((address.province && address.district) || address.province) {
      setUserData((prevState)=>({
        ...prevState,
        address: { ...prevState.address, district: "", territory: "" }
      }))
    }
  }, [address.province]);

  useEffect(() => {
    if ((address.district && address.territory) || address.district) {
      setUserData((prevState)=>({
        ...prevState,
        address: { ...prevState.address, territory: "" }
      }))
    }
  }, [address.district]);

  // if (isSuccess) {
  //   window.location.reload(false)
  //    return <Navigate to={'/'} replace />
  // }

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value.trim(),
  //   }));
  // };

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

  const onSubmit = async (e) => {
    e.preventDefault();

    if ((fullname.split(" ").length < 2) || !fullname.trim())  {
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
      toast.error("Email inv??lido", {
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
    if ((password !== password2) || !password || !password2) {
      toast.error("Passwords n??o correspondem", {
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
    

    if (!(roles.indexOf(role) > -1)) {
      toast.error("Perfil inv??lido", {
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

    if (!address.province || !address.district) {

        toast.error("Endere??o incompleto!", {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });

      return ;
    }

    const normalizedUserData = {
      ...userData,
    };
    
    dispatch(register(normalizedUserData));
    // await register(normalizedUserData);
    
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        marginTop: "10px",
      }}
    >
      <Paper
        sx={{
          maxWidth: "500px",
          height: "auto",
          textAlign: "center",
          mt: "20px",
          mb: "10px",
        }}
      >
        {/* <Typography color="primary" sx={{ fontSize: "19px", textAlign: "right", marginRight: "20px"}}>
            <Link to="/login" >login</Link>
        </Typography> */}

        <Typography
          variant="h6"
          fontWeight={200}
          component="p"
          sx={{ p: "20px 0px 5px 0px" }}
        >
          Registar-se
        </Typography>
       
        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
          <div style={{ padding: "20px 10px 15px 10px" }}>
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
              onChange={(event)=>{
                setUserData((prevState)=>({
                  ...prevState,
                  fullname: event.target.value,
                }))
              }}
            />
          </div>
          <div style={{ padding: "10px 10px 15px 10px" }}>
            <TextField
              sx={styledTextField}
              required
              fullWidth
              label="Email"
              id="fullWidth email"
              name="email"
              type="email"
              placeholder="Email"
              size="small"
              value={email}
              onChange={(event)=>{
                setUserData((prevState)=>({
                  ...prevState,
                  email: event.target.value.toLowerCase(),
                }))
              }}
            />
          </div>
          <div style={{ padding: "10px 10px 15px 10px" }}>
            <TextField
              sx={styledTextField}
              required
              fullWidth
              label="Password"
              id="fullWidth password"
              name="password"
              type="password"
              placeholder="Password"
              size="small"
              value={password}
              onChange={(event)=>{
                setUserData((prevState)=>({
                  ...prevState,
                  password: event.target.value,
                }))
              }}
            />
          </div>
          <div style={{ padding: "10px 10px 15px 10px" }}>
            <TextField
              sx={styledTextField}
              required
              fullWidth
              label="Confirmar password"
              id="fullWidth password2"
              name="password2"
              type="password"
              placeholder="Password"
              size="small"
              onChange={(event)=>{
                setUserData((prevState)=>({
                  ...prevState,
                  password2: event.target.value,
                }))
              }}
            />
          </div>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ width: "49%", padding: "10px 10px 15px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo-1"
                value={role}
                options={roles}
                onChange={(event, newRole)=>{
                  setUserData((prevState)=>({
                    ...prevState,
                    role: newRole,
                  }))
                }}
                inputValue={inputRole}
                onInputChange={(event, newInputRole) => {
                  setInputRole(newInputRole);
                }}
                renderInput={(params) => (
                  <TextField sx={styledTextField} name="role" {...params} required label="Perfil" />
                )}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option === value }
              />
            </div>
            <div style={{ width: "49%", padding: "10px 10px 15px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo-2"
                value={gender}
                options={genders}
                onChange={(event, newGender)=>{
                  setUserData((prevState)=>({
                    ...prevState,
                    gender: newGender,
                  }))
                }}
                inputValue={inputGender}
                onInputChange={(event, newInputGender) => {
                  setInputGender(newInputGender);
                }}
                renderInput={(params) => (
                  <TextField sx={styledTextField} name="gender" {...params} required label="G??nro" />
                )}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option === value }
              />
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ width: "49%", padding: "10px 10px 5px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo-3"
                options={provinces || ['']}
                value={address?.province}
                onChange={(event, newProvince)=>{
                  setUserData((prevState)=>({
                    ...prevState,
                    address: { ...prevState?.address, province: newProvince }
                  }))
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
                    label="Prov??ncia"
                    required
                    helperText="Resid??ncia"
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option === value }
              />
            </div>

            <div style={{ width: "49%", padding: "10px 10px 5px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo-4"
                value={address?.district}
                options={
                  address?.province
                    ? districts[address?.province]
                    : ["Primeiro, selecciona a prov??ncia"]
                }
                onChange={(event, newDistrict) => {
                if (!Array.isArray(districts[address?.province])) {
                  toast.error('Primeiro, seleciona a prov??ncia!', {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_RIGHT,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  })
                  setUserData((prevState)=>({
                    ...prevState,
                    address: { ...prevState?.address, district: "" }
                  }))
                  return ;
                }
                  setUserData((prevState)=>({
                    ...prevState,
                    address: { ...prevState?.address, district: newDistrict }
                  }))
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
                    helperText="resid??ncia"
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                      value === undefined || value === "" || option === value }
              />
            </div>
          </Stack>
          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ width: "49%", padding: "10px 10px 15px 10px" }}>
              <Autocomplete
                fullWidth
                required
                size="small"
                disablePortal
                id="combo-box-demo-5"
                value={address?.territory}
                options={
                  address?.district
                    ? adminPosts[address?.district]
                    : ["Primeiro, selecciona o distrito"]
                }
                onChange={(event, newTerritory) => {
                  if (!Array.isArray(adminPosts[address?.district])) {
                    toast.error('Primeiro, seleciona o distrito!', {
                      autoClose: 5000,
                      position: toast.POSITION.TOP_RIGHT,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                    setTerritory('')
                    return ;
                  }
                  setUserData((prevState)=>({
                    ...prevState,
                    address: { ...prevState.address, territory: newTerritory }
                  }))
                }}
                inputValue={inputTerritory}
                onInputChange={(event, newInputTerritory) => {
                  setInputTerritory(newInputTerritory);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={styledTextField}
                    name="adminPost"
                    {...params}
                    label="Posto Admin"
                    helperText="resid??ncia"
                  />
                )}
                isOptionEqualToValue={(option, value) =>
                      value === undefined || value === "" || option === value }
              />
            </div>
            <div style={{ width: "49%", padding: "10px 10px 15px 10px" }}>
              <TextField
                sx={styledTextField}
                fullWidth
                label="Telefone"
                id="fullWidth phone"
                name="phone"
                type="number"
                placeholder="Telefone"
                size="small"
                onChange={(event)=>{
                  setUserData((prevState)=>({
                    ...prevState,
                    phone: event.target.value
                  }))
                }}
              />
            </div>
          </Stack>

          <div style={{ padding: "5px 10px 20px 10px" }}>
            <BootstrapButton variant="contained" type="submit">
              Criar conta
            </BootstrapButton>
          </div>
        </Box>
      </Paper>
    </Box>
  );
}

export default UserRegister;
