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

// const RegisterUI = styled('div')(({ theme })=>({

//   [theme.breakpoints.down('sm')]: {

//   }

// })

function Register() {
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
              focused
            />
          </div>
          <div style={{ padding: "10px 10px 15px 10px" }}>
            <TextField
              required
              fullWidth
              label="Email"
              id="fullWidth email"
              name="email"
              type="email"
              placeholder="Email"
              size="small"
              value={email}
              onChange={onChange}
            />
          </div>
          <div style={{ padding: "10px 10px 15px 10px" }}>
            <TextField
              required
              fullWidth
              label="Password"
              id="fullWidth password"
              name="password"
              type="password"
              placeholder="Password"
              size="small"
              value={password}
              onChange={onChange}
            />
          </div>
          <div style={{ padding: "10px 10px 15px 10px" }}>
            <TextField
              required
              fullWidth
              label="Confirmar password"
              id="fullWidth password2"
              name="password2"
              type="password"
              placeholder="Password"
              size="small"
              // value={password2}
              onChange={onChange}
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
                id="combo-box-demo"
                value={role}
                options={roles}
                onChange={(event, newRole) => {
                  setRole(newRole);
                }}
                inputValue={inputRole}
                onInputChange={(event, newInputRole) => {
                  setInputRole(newInputRole);
                }}
                renderInput={(params) => (
                  <TextField name="role" {...params} required label="Perfil" />
                )}
              />
            </div>
            <div style={{ width: "49%", padding: "10px 10px 15px 10px" }}>
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
                  <TextField name="gender" {...params} required label="Gênro" />
                )}
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
                    name="province"
                    {...params}
                    label="Província"
                    required
                    helperText="residência"
                  />
                )}
              />
            </div>

            <div style={{ width: "49%", padding: "10px 10px 15px 10px" }}>
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
                    name="district"
                    {...params}
                    label="Distrito"
                    required
                    helperText="residência"
                  />
                )}
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
                    name="adminPost"
                    {...params}
                    label="Posto Admin"
                    helperText="residência"
                  />
                )}
              />
            </div>
            <div style={{ width: "49%", padding: "10px 10px 15px 10px" }}>
              <TextField
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
          </Stack>

          <div style={{ padding: "15px 10px 20px 10px" }}>
            <BootstrapButton variant="contained" type="submit">
              Criar conta
            </BootstrapButton>
          </div>
        </Box>
      </Paper>
    </Box>
  );
}

export default Register;
