import {
  getFarmersService,
  addFarmerService,
  getFarmerByIdService,
  getFarmerByDistrictService,
  updateFarmerService,
  deleteFarmerService,
} from "../services/farmer.services.js";
import asyncHandler from 'express-async-handler'
import Farmer from "../models/farmer.model.js";
//@desc
//@route
//@access
const getFarmers = asyncHandler (async (req, res) => {
  const { user } = req;
  let farmers;

  // try {
    switch (user.role) {
      case "Extensionista":
        farmers = await Farmer.find({
          district: { adress: { district } },
        }).populate("farmlands");
        break;
      case "Produtor":
        farmers = await Farmer.findById(ObjectId(user._id)).populate(
      "farmlands"
    );
        break;
      case "Gestor":
        farmers = await Farmer.find({});
      default:
        res.status(401);
        throw new Error("Nao autorizado");
    }
    return res.status(200).json({
      status: "OK",
      data: farmers,
    });
});

//@desc
//@route
//@access
// Duplicates must not be allowed
const addFarmer = asyncHandler (async (req, res) => {
  const { body } = req;
  // assign the user province and district to farmer's address.
  // no user  should register farmer outside their own district
  // body.address.province = user.address.province;
  // body.address.district = user.address.district;

    const newFarmer = new Farmer(body);
    const savedFarmer = await newFarmer.save();
    const { fullname, gender, birthDate, birthPlace, address, phone } = savedFarmer
    return res.status(201).json({
      fullname,
      gender,
      birthDate,
      birthPlace,
      address,
      phone,
    });
});

//@desc
//@route
//@access
const getFarmerById = asyncHandler (async (req, res) => {
  const {
    params: { farmerId },
  } = req;
  if (!farmerId) {
    // return res.status(400).send({
    //   status: "FAILED",
    //   data: { error: "O parametro ':farmerId' nao pode ser vazio" },
    // });
    res.status(400);
    throw new Error("O parametro ':farmerId' nao pode ser vazio");
  }
  // try {
    const foundFarmer = await getFarmerByIdService(farmerId);
    if (!foundFarmer) {
      res.status(404);
      throw new Error("Produtor nao encontrado");
    }
    return res.status(200).type("application/json").json({
      status: "OK",
      data: foundFarmer,
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

//@desc
//@route
//@access
const updateFarmer = asyncHandler (async (req, res) => {
  const {
    body,
    params: { farmerId },
  } = req;
  if (!farmerId) {
    res.status(400);
    throw new Error("O parametro ':farmerId' nao pode ser vazio");
  }

  // try {
    let updatedFarmer = await updateFarmerService(farmerId, body);
    if (!updatedFarmer) {
      res.status(404);
      throw new Error("Produtor nao encontrados");
    }
    return res.status(200).json({
      status: "OK",
      data: updatedFarmer,
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

//@desc
//@route
//@access
const deleteFarmer = asyncHandler (async (req, res) => {
  const {
    params: { farmerId },
  } = req;
  if (!farmerId) {
    res.status(400);
    throw new Error("O parametro ':farmerId' nao pode ser vazio");
  }
  // try {
    let deletionResult = await deleteFarmerService(farmerId);
    return res.status(204).send(deletionResult);
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

export { addFarmer, getFarmerById, getFarmers, updateFarmer, deleteFarmer };
