
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { register, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import { clones } from '../../app/clones'
import { plantingTechniques } from '../../app/plantingTechniquesList'
import { BootstrapButton } from "../../components/Buttons";

import {
  Autocomplete,
  Avatar,
  Box,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
// import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import {  AddLocation } from "@mui/icons-material";
import Division from "./Division";
import { interCrops } from '../../app/interCropsList' 




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

  const [farmlandData, setFarmlandData] = useState({
    label: '',
    declaredArea: '',
    interCrops: [],
  })

  const [division, setDivision] = useState({
    trees: '',
    sowingYear: '',
    plantedArea: '',
    spacing: {
      x: '',
      y: ''
    },
    plantingTechniques: {
      seedling: "",
      grafting: []
    }
  })

  const [inputSeedling, setInputSeedling] = useState('')

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);
  const { farmer } = useSelector((state)=>state.farmer)
  const { farmland } = useSelector((state)=>state.farmland)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { label, declaredArea, interCrops } = farmlandData;
  const { trees, sowingYear, plantedArea, spacing, plantingTechniques } = division;




  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message, {
  //       autoClose: 5000,
  //       position: toast.POSITION.TOP_CENTER,
  //     });
  //   } else if (isSuccess && user && farmer && farmland) {
  //     navigate("/dashboard");
  //   }

  //   // dispatch(reset());
  // }, [user, farmer, farmland, isError, isSuccess, message, navigate, dispatch]);




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

  // const onAddDivision = (event) => {
  //   event.preventDefault()

  //   setFarmlandData((prevState)=>({
  //     ...prevState,
  //     divisions: [...prevState.divisions, division]
  //   }))
  //   setDivision({
  //     trees: '',
  //     sowingYear: '',
  //     plantedArea: '',
  //     spacing: {
  //       x: '',
  //       y: ''
  //     },
  //     plantingTechniques: {
  //       seedling: "",
  //       grafting: []
  //     }
  //     })
  // };


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

    if (isNaN(declaredArea)) {
      toast.error("Área declarada tem de ser um número!", {
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

    if (isNaN(trees)) {
      toast.error("Número de cajueiros tem de ser um número!", {
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


    if (isNaN(plantedArea)) {
      toast.error("Área plantada tem de ser um número!", {
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

    if (isNaN(sowingYear) && (sowingYear > 1900) && (sowingYear <= new Date().getFullYear())) {
      toast.error("Ano de plantio tem de ser válido!", {
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


    const normalizedFarmlandData = {
      label,
      interCrops,
      declaredArea,
      divisions: [
        {
          sowingYear,
          plantedArea,
          spacing,
          plantingTechniques,
          trees,
        }
      ]
    };
    console.log('all data: ', normalizedFarmlandData)
    // dispatch(register(normalizedFarmlandData));
  };

  console.log('farmlandData: ', farmlandData)

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
              <Typography variant='body2'>({`${farmer?.category}`})</Typography>
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
        }} >  

    <Stack             
        direction="row"
        sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{  padding: "10px 10px 10px 10px" }}>
            <TextField
            sx={styledTextField}
            fullWidth
            label="Área declarada"
            id="fullWidth "
            value={farmlandData.declaredArea}
            name="declaredArea"
            type="number"
            placeholder="Área (hectares)"
            size="small"
            onChange={(event)=>{
              setFarmlandData((prevState)=>({
                ...prevState,
                declaredArea: event.target.value
              }));
            }}
            />
        </div>

        <div style={{ padding: "10px 10px 10px 10px" }}>
        <TextField
            sx={styledTextField}
            required
            fullWidth
            label="Localização geográfica "
            id="fullWidth"
            value={farmlandData.label}
            name="label"
            type="text"
            placeholder="Localização geográfica "
            size="small"
            onChange={(event)=>{
              setFarmlandData((prevState)=>({
                ...prevState,
                label: event.target.value
              }));
            }}
        />
        </div>
        </Stack>
        <Stack         
          direction="row"
          sx={{  }} >
          <div style={{ width: "100%", padding: "10px 10px 10px 10px" }}>
            <Autocomplete
                multiple
                id="tags-outlined"
                options={interCrops}
                getOptionLabel={(crop) => crop}
                defaultValue={[]}
                filterSelectedOptions
                onChange={(event, newCrops) => {
                    setFarmlandData((prevState) =>({
                      ...prevState,
                      interCrops: newCrops,
                    }))
                  }}
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Culturas consorciadas"
                    placeholder="Selecciona culturas"
                    size="small"
                    sx={styledTextField}
                />
                )}
                isOptionEqualToValue={(option, value) =>
                  value === undefined || value === "" || option === value }
            />
          </div>
        </Stack>
        </Paper>

          <div style={{ padding: "10px 10px 5px 10px" }}>
            <Typography variant="body2">
              Registar divisões deste pomar segundo os anos de plantio dos seus cajueiros.
            </Typography>
          </div>

            {/* Division starts here! */}

    <Paper
            sx={{
            maxWidth: "500px",
            height: "auto",
            textAlign: "center",
            margin: "10px 5px 5px 5px",
            pt: "5px",
            }}
        >  
        
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
            onChange={(event)=>{
              setDivision((prevState)=>({
                ...prevState,
                sowingYear: event.target.value
              }))
            }}
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
            onChange={(event)=>{
              setDivision((prevState)=>({
                ...prevState,
                trees: event.target.value
              }))
            }}
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
              name="plantedArea"
              type="number"
              placeholder="Área (hectares)"
              size="small"
              onChange={(event)=>{
                setDivision((prevState)=>({
                  ...prevState,
                  plantedArea: event.target.value
                }))
              }}
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
                onChange={(event)=>{
                  setDivision((prevState)=>({
                    ...prevState,
                    spacing: {...prevState.spacing, x: event.target.value }
                  }))
                }}
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
                    onChange={(event)=>{
                      setDivision((prevState)=>({
                        ...prevState,
                        spacing: {...prevState.spacing, y: event.target.value }
                  }))
                }}
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
                value={plantingTechniques.seedling}
                options={
                  plantingTechniques
                }
                onChange={(event, newSeedling) => {
                  setDivision((prevState)=>({
                    ...prevState,
                    plantingTechniques: { ...prevState.plantingTechniques, seedling: newSeedling }
                  }));
                }}
                inputValue={inputSeedling}
                onInputChange={(event, newInputSeedling) => {
                  setInputSeedling(newInputSeedling);
                }}
                renderInput={(params) => (
                  <TextField
                    sx={styledTextField}
                    name="seedling"
                    {...params}
                    label="Tipo de plantios"
                  />
                )}
              />
            </div>
          </Stack>
           {
            division.plantingTechniques.seedling === 'enxertia' 
            ? 
            <div style={{ width: "100%", padding: "10px 10px 10px 10px" }}>
              <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={clones}
                  getOptionLabel={(clone) => clone}
                  defaultValue={[]}
                  filterSelectedOptions
                  onChange={(event, newClone) => {
                    setDivision((prevState) =>({
                      ...prevState,
                      plantingTechniques: { ...prevState.plantingTechniques, grafting: newClone },
                    }))
                  }}
                  renderInput={(params) => (
                  <TextField
                      {...params}
                      label="Tipos de clones"
                      size="small"
                      placeholder="Selecciona clone"
                      sx={styledTextField}
                  />
                  )}
              />
            </div> : null
            }
        </Paper> 



            {/* Division ends here! */}


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
