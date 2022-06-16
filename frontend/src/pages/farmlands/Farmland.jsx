
import { Edit } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, Grid, Stack, styled, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import Navbar from '../../components/Navbar'
import { FaPencilAlt } from 'react-icons/fa'
import Footer from '../../components/Footer'
import { useLocation, useParams } from 'react-router-dom'
import { useGetFarmersByQuery } from '../../features/farmers/farmerSlice'
import { useGetFarmlandsByQuery } from '../../features/farmlands/farmlandSlice'
import Spinner from '../../components/Spinner'

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
    gap: "5px",
    width: "100%",
    marginRight: "10px",

}))

const sortDivisionsBySowingYear = (divisions)=>{
  return divisions.sort(function (a, b) {
      return b.sowingYear - a.sowingYear;
  });
}

const Farmland = ({ user }) => {

    const location = useLocation()
   
    const { farmland, farmer } = location.state;


    farmland['divisions'] = sortDivisionsBySowingYear(farmland['divisions'])
    


    
    // let filterBy = user?.role === 'Extensionista' 
    //                 ? user?.address?.district 
    //                 : user?.role === 'Gestor' 
    //                 ? user?.address?.province
    //                 : user?.role === 'Produtor'
    //                 ? user?.address?.territory : null;

    // let { data: farmlands, error: farmlandsError, isLoading: farmlandsIsLoading } = useGetFarmlandsByQuery(filterBy)




    // get all ther farmlands associated to this farmer
    // let foundFarmlands = farmlands?.filter(farmland=>farmland.farmer._id === farmer._id)

    // normalize date format: dd/mm/aaaa
    // const normalizeDate = (date)=>{
    //     return new Date(date).getDate() + '/'
    //          + (new Date(date).getMonth() + 1) + '/' 
    //          + new Date(date).getFullYear()
    // }

    // const GetTotalArea = (farmlands) => {
    //     // get all the declared areas for all the farmlands
    //     let declaredAreas = foundFarmlands?.map(f=>f?.declaredArea)

    //     // get all the actual areas for all the farmlands
    //     let actualAreas = foundFarmlands?.map(f=>f?.actualArea)

    //     // get all  the trees from all the farmlands
    //     let totalTrees = foundFarmlands?.map(f=>f?.totalTrees)
        
    //     return {
    //         declaredArea: declaredAreas?.reduce((ac, el)=> ac + el, 0),
    //         actualArea: actualAreas?.reduce((ac, el)=> ac + el, 0),
    //         totalTrees: totalTrees?.reduce((ac, el)=> ac + el, 0),
    //     }
    // }

    const getFromDivision = (division)=>{
      return {
        plantedArea: division?.plantedArea,
        trees: division?.trees,
        sowingYear: division.sowingYear,
        spacing: (division?.spacing?.category === 'irregular') ? 'irregular' : `regular (${division?.spacing?.x} x ${division?.spacing?.y})`,
        divisionType: (new Date().getFullYear() - division?.sowingYear) >= 5 ? 'Parcela Antiga' : 'Parcela Nova',  
        plantingTechniques:  division?.plantingTechniques.seedling  ? 'sementes policlonal' : `enxertia ${division?.plantingTechniques?.grafting}`,
      }
    }

    // if(farmlandsIsLoading) {
    //     return <Spinner />
    // }




  return (
    <Box>
      <Navbar pageDescription={'Pomar'} />
    
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        maxWidth: "960px",
        marginTop: "45px",
        marginLeft: "15px"
      }}
    >

      {/* Start Farmer's Profile */}
     
      <UserStack direction="row" onClick={()=>(true)} sx={{ m: "10px", }}>
        <Avatar sx={{ width: "50px", height: "50px"}} src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
        <Box sx={{ textAlign: "center", width: "50%", marginRight: "5px" }}>
            <Typography variant='body1'>{`${farmer?.fullname}`}</Typography>
            <Typography variant='body2'>({`${farmer?.category}`})</Typography>
        </Box>
      </UserStack>
    </Box>

    <Divider sx={{ mt: "10px", mb: "10px", }} />

    <Box sx={{ maxWidth: "960px", padding: "10px", marginLeft: "15px" }}>

    {/* dados do pomar */}
    <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%",textAlign: 'left'}} >
        {farmer?.viilage ? 'Localidade (Designação):' : 'Designação:' }
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        {farmer?.village ?  `${farmer?.address?.village} (${farmland?.label}):` : `${farmland?.label}`}
      </Box>
    </Stack>

      {/* Dados Immutaveis do pomar  */}
    <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
        Distrito (posto):
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        <Typography>{`${farmland?.district} (${farmland?.territory ? farmland?.territory : 'N/A' })` }</Typography>
      </Box>
    </Stack>

    {/* Dados mutaveis do pomar  */}

    <Divider  sx={{ mt: "10px", mb: "10px", }} />
    <Box sx={{width: "100%", marginRight: "5px", textAlign: "right" }}>
      <Button sx={{ width: "50px"}}>
          <Edit fontSize='small' sx={{ color: "rebeccapurple"}} />
      </Button>
    </Box>

    {/*  */}
    <Stack direction="row" sx={{ padding: "0px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
        Área declarada:
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        <Typography>{`${farmland?.declaredArea} hectares`}</Typography>
      </Box>
    </Stack>

        {/*  */}
    <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
        Área plantada:
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        <Typography>{`${farmland?.actualArea} hectares`}</Typography>
      </Box>
    </Stack>

     {/*  */}
    <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
       Cajueiros:
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        <Typography>{`${farmland?.totalTrees} árvores`}</Typography>
      </Box>
    </Stack>

         {/*  */}
    <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
       Culturas consorciadas:
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        <Typography>{`[${farmland?.interCrops.join(", ").toString()}]`}</Typography>
      </Box>
    </Stack>

      {/* Divisions */}

    {
      farmland?.divisions?.map((division, i)=>(
        <Fragment key={i}>
        <Divider sx={{ mt: "10px", mb: "10px", }} />
          <Box sx={{ width: "100%", height: "30px", p: 1, backgroundColor: "rebeccapurple"}}>
            <Typography variant='body2' color="#eee" sx={{ fontWeight: 600, textAlign: "center" }}>{`${getFromDivision(division).divisionType}: (${getFromDivision(division).sowingYear})`}</Typography>
          </Box>
          <Box sx={{width: "100%", marginRight: "5px", textAlign: "right" }}>
            <Button sx={{ width: "50px"}}>
                <Edit fontSize='small' sx={{ color: "rebeccapurple"}} />
            </Button>
         </Box>
          <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
            <Box sx={{ width: "50%", textAlign: 'left'}} >
              Área plantada:
            </Box>
            <Box sx={{width: "50%", textAlign: 'left'}}>
              {`${getFromDivision(division)?.plantedArea}`}
            </Box>
          </Stack>

          <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
            <Box sx={{ width: "50%", textAlign: 'left'}} >
              Cajueiros:
            </Box>
            <Box sx={{width: "50%", textAlign: 'left'}}>
              {`${getFromDivision(division)?.trees}`}
            </Box>
          </Stack>

          <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
            <Box sx={{ width: "50%", textAlign: 'left'}} >
              Compasso:
            </Box>
            <Box sx={{width: "50%", textAlign: 'left'}}>
              {`${getFromDivision(division)?.spacing}`}
            </Box>
          </Stack>

          <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
            <Box sx={{ width: "50%", textAlign: 'left'}} >
              Técnica de plantio:
            </Box>
            <Box sx={{width: "50%", textAlign: 'left'}}>
              {`[${getFromDivision(division)?.plantingTechniques.toString()}]`}
            </Box>
          </Stack>
        </Fragment>
      ))
    }

      {/* pomares */}
    {/* <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
        Número de pomares:
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        {`${foundFarmlands?.length}`}
      </Box>
    </Stack> */}

      {/* cajueiros */}
    {/* <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%",  textAlign: 'left'}} >
        Número de cajueiros:
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        {`${GetTotalArea()?.totalTrees}`}
      </Box>
    </Stack> */}


      {/* hectares */}
    {/* <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
        Área total plantada:
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        {`${GetTotalArea()?.actualArea}`}
      </Box>
    </Stack> */}


      {/* hectares */}
    {/* <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
        Área total declarada:
      </Box>
      <Box sx={{width: "50%", textAlign: 'left'}}>
        {`${GetTotalArea()?.declaredArea}`}
      </Box>
    </Stack> */}

          {/* producao */}
    {/* <Stack direction="row" sx={{ padding: "5px 5px 5px 5px"}} gap={2}>
      <Box sx={{ width: "50%", textAlign: 'left'}} >
        Produção anual:
      </Box>
      <Box sx={{width: "50%",  textAlign: 'left'}}>
        N/A
      </Box>
    </Stack> */}

     <Divider sx={{ mt: "10px", mb: "10px", }} />

    </Box>
    <Footer />
    </Box>
  )
}

export default Farmland