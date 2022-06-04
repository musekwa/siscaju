import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { farmerRegister, reset } from "../../features/farmers/farmerSlice";
import Spinner from "../../components/Spinner";
import { roles } from "../../app/roles";
import { provinces } from "../../app/provinces";
import { genders } from "../../app/genders";
import { districtsByProvince as districts } from "../../app/districts";
import { administrativePosts as adminPosts } from "../../app/administrativePosts";
import { BootstrapButton } from "../../components/Buttons";

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
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {  DatePicker } from '@mui/x-date-pickers';



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

  let [farmerData, setFarmerData] = useState({
    fullname: '',
    gender: '',
    birthDate: "",
    birthPlace : {
      province: "",
      district: "",
      territory: '',
      village: '',
    },
    address: {
      territory2: '',
      village2: '',
    },
    phone: '',
  })
  
  const [inputGender, setInputGender] = useState('')
  const [inputBirthProvince, setInputBirthProvince] = useState('')
  const [inputBirthDistrict, setInputBirthDistrict] = useState('')
  const [inputBirthTerritory, setInputBirthTerritory] = useState('')
  const [inputResidenceTerritory, setInputResidenceTerritory] = useState('')


  // get user's state from redux store
  // the user's address is needed to complete the farmer's address
  // the user is not allowed to register farmers outside they district
  const { user } = useSelector( (state) => state.auth);
  const { farmer, isLoading, isError, isSuccess, message } = useSelector((state)=>state.farmer)


  const { fullname, gender, birthDate, birthPlace, address, phone } = farmerData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        autoClose: 5000,
        hideProgressBar: true,
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (isSuccess) {
      toast.success(`Produtor ${farmer.fullname.split(' ')[0]} registado com sucesso!`, {
        autoClose: 5000,
        hideProgressBar: true,
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/farmers/success");
    }
    dispatch(reset());
  }, [user, farmer, isError, isSuccess, message, navigate, dispatch]);


  useEffect(() => {
    if ((birthPlace.province && birthPlace.district) || birthPlace.province) {
      setFarmerData((prevState)=>({
        ...prevState,
        birthPlace: { ...prevState.birthPlace, district: "", territory: "" }
      }))
    }
  }, [birthPlace.province]);

  
  useEffect(() => {
    if ((birthPlace.district && birthPlace.territory) || birthPlace.district) {
      setFarmerData((prevState)=>({
        ...prevState,
        birthPlace: { ...prevState.birthPlace,  territory: "" }
      }))
    };
  }, [birthPlace.district]);


  const onSubmit = (e) => {
    e.preventDefault();
  
    if (fullname.split(" ").length < 2) {
      toast.error("Nome deve ser completo", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // create a date object for validation's purpose
    const date = new Date(birthDate);

    // validating the birth date
    if (
      !Date.parse(birthDate) || 
      !((date.getFullYear() > 1920) && (date.getFullYear() < 2010))  || 
      !(date.getMonth() < 12) ||
      !(date.getDate() <= 31)) {
        toast.error("Data de nascimento inválida!", {
          autoClose: 5000,
          position: toast.POSITION.TOP_RIGHT,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      return ;
    }
    if (!gender) {
      toast.error("Selecciona o gênro do produtor!", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return ;
    }

    if (!birthPlace.province || !birthPlace.district || !birthPlace.territory) {
      toast.error("Completa o lugar de nascimento!", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return ;
    }

    if (!address.territory2) {
      toast.error("Completa o endereco!", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return ;
    }

    if (!user.address.province || !user.address.district) {
      toast.error("Faz o login antes de registar produtores!", {
        autoClose: 5000,
        position: toast.POSITION.TOP_RIGHT,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return ;
    }

    const normalizedFarmerData = {
      ...farmerData,
      address: {
        province: user.address.province, // user's province
        district: user.address.district,  // user's district
        territory: farmerData.address.territory2,
        village: farmerData.address.village2,
      }
    }
    dispatch(farmerRegister(normalizedFarmerData));
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
        marginTop: "45px"
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
            onChange={(event)=>{
              setFarmerData((prevState)=>({
                ...prevState,
                fullname: event.target.value
              }))
            }}
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
                setFarmerData((prevState) =>({
                  ...prevState,
                  gender: newGender,
                }))
                // setGender(newGender);
              }}
              inputValue={inputGender}
              onInputChange={(event, newInputGender) => {
                // setInputGender(newInputGender);
                setInputGender(newInputGender)
              }}
              renderInput={(params) => (
                <TextField sx={styledTextField} name="gender" {...params} required label="Gênro" />
              )}
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option === value }
            />
          </div>

          <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
              {/* <TextField
                  id="date"
                  size="small"
                  label="Data de Nascimento"
                  type="date"
                  name="birthDate"
                  value={birthDate}
                  onChange={(event)=>{
                    setFarmerData((prevState)=>({
                      ...prevState,
                      birthDate: event.target.value
                    }))
                  }}
                  fullWidth
                  defaultValue="2017-05-27"
                  sx={styledTextField}
                  InputLabelProps={{
                  shrink: true,
                  }}
              /> */}
              <DatePicker 
                label="Data de Nascimento" 
                onChange={(newDate)=>{
                  setFarmerData((prevState)=>({
                    ...prevState,
                    birthDate: newDate
                  }))
                }}
                value={birthDate}
                renderInput={(params)=>(
                  <TextField {...params}
                    id="date"
                    size="small"
                    name="birthDate"
                    // value={birthDate}
                    fullWidth 
                    sx={styledTextField}
                  />)}
                
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
                // setProvince(newProvince);
                setFarmerData((prevState)=>({
                  ...prevState,
                  birthPlace: { ...prevState.birthPlace, province: newProvince }
                }))
              }}
              inputValue={inputBirthProvince}
              onInputChange={(event, newInputBirthProvince) => {
                setInputBirthProvince(newInputBirthProvince);
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
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option === value }
            />
          </div>

          <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
            <Autocomplete
              fullWidth
              required
              size="small"
              disablePortal
              id="combo-box-demo"
              value={birthPlace.district}
              options={
                birthPlace.province
                  ? districts[birthPlace.province]
                  : ["Primeiro, selecciona a província!"]
              }
              onChange={(event, newDistrict) => {
                if (!Array.isArray(districts[birthPlace.province])) {
                    toast.error("Primeiro, selecciona a província!", {
                      autoClose: 5000,
                      position: toast.POSITION.TOP_RIGHT,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  return ;
                }
                setFarmerData((prevState)=>({
                  ...prevState,
                  birthPlace: { ...prevState.birthPlace, district: newDistrict }
                }))
              }}
              inputValue={inputBirthDistrict}
              onInputChange={(event, newInputBirthDistrict) => {
                setInputBirthDistrict(newInputBirthDistrict);
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
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option === value }
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
              value={birthPlace.territory}
              options={
                birthPlace.district
                  ? adminPosts[birthPlace.district]
                  : ["Primeiro, selecciona o distrito"]
              }
              onChange={(event, newTerritory) => {
                if (!Array.isArray(adminPosts[birthPlace.district]) ) {
                    toast.error("Primeiro, selecciona a província!", {
                      autoClose: 5000,
                      position: toast.POSITION.TOP_RIGHT,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    })
                  return ;
                }
                setFarmerData((prevState)=>({
                  ...prevState,
                  birthPlace: { ...prevState.birthPlace, territory: newTerritory }
                }))
              }}
              inputValue={inputBirthTerritory}
              onInputChange={(event, newInputBirthTerritory) => {
                setInputBirthTerritory(newInputBirthTerritory);
              }}
              renderInput={(params) => (
                <TextField
                  sx={styledTextField}
                  name="territory"
                  {...params}
                  label="Posto Admin"
                  helperText="Nascimento"
                />
              )}
              isOptionEqualToValue={(option, value) =>
                value === undefined || value === "" || option === value }
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
              onChange={(event)=>{
                setFarmerData((prevState)=>({
                  ...prevState,
                  birthPlace: { ...prevState.birthPlace, village: event.target.value }
                }))
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
              value={address?.territory2}
              options={
                user?.address?.district
                  ? adminPosts[user?.address?.district]
                  : ["O usuário não fez o login"]
              }
              onChange={(event, newTerritory) => {
                setFarmerData((prevState)=>({
                  ...prevState,
                  address: {...prevState.address, territory2: newTerritory}
                }));
              }}
              inputValue={inputResidenceTerritory}
              onInputChange={(event, newInputResidenceTerritory) => {
                setInputResidenceTerritory(newInputResidenceTerritory);
              }}
              renderInput={(params) => (
                <TextField
                  sx={styledTextField}
                  name="territory2"
                  {...params}
                  label="Posto Admin"
                  helperText="Residência"
                />
              )}
              isOptionEqualToValue={(option, value) =>
              value === undefined || value === "" || option === value }
            />
          </div>
          <div style={{ width: "49%", padding: "10px 10px 10px 10px" }}>
            <TextField
              sx={styledTextField}
              fullWidth
              label="Localidade"
              id="fullWidth village"
              name="village2"
              type="text"
              placeholder="Localidade"
              helperText="Residência"
              size="small"
              onChange={(event)=>{
                setFarmerData((prevState)=>({
                  ...prevState,
                  address: { ...prevState.address, village2: event.target.value},
                }))
              }}
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
              onChange={(event)=>{
                setFarmerData((prevState)=>({
                  ...prevState,
                  phone: event.target.value,
                }))
              }}
              />
          </div>
      </Paper>
        <div style={{ padding: "15px 10px 20px 10px" }}>
          <BootstrapButton variant="contained" type="submit">
            Registar Produtor
          </BootstrapButton>
        </div>
      </Box>      
    </Box>
    <Footer />
    </Box>
  );
}

export default FarmerRegister;
