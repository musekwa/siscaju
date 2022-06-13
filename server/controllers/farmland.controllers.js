import _ from "lodash";
import mongoose from "mongoose";
import Farmer from "../models/farmer.model.js";
import Farmland from "../models/farmland.model.js";
import UserPerformance from "../models/userPerformance.model.js";
import DistrictPerformance from '../models/districtPerformance.model.js'
import {
  getFarmlandsByFarmerIdService,
  addFarmlandService,
  getFarmlandsService,
  getOneFarmlandByFarmerIdService,
  getFarmlandByFarmlandIdService,
  updateFarmlandService,
  deleteFarmlandService,
} from "../services/farmland.services.js";
import asyncHandler from 'express-async-handler'

const ObjectId = mongoose.Types.ObjectId;

//@desc
//@route
//@access
const addFarmland = asyncHandler (async (req, res) => {
  const {
    body,
    query: { farmerId },
    user,
  } = req;

  body['user'] = {
    fullname: user?.fullname,
    email: user?.email,
    phone: user?.phone
  }

  body['district'] = user?.address?.district;

  // create a new farmland document
  let newFarmland = new Farmland(body);

  // find the farmland's owner
  let foundFarmer = await Farmer.findById(ObjectId(farmerId));

  if (!foundFarmer) {
    res.status(400);
    throw new Error("Nao pode adicionar pomar de um produtor que nao existe.");
  }

  // reference the farmland to their owner
  foundFarmer.farmlands.push(newFarmland);

  // save changes
  let updatedFarmer = await foundFarmer.save();

  // reference the farmer to their farmland
  newFarmland.farmer = updatedFarmer;

  // save the farmland
  let updatedFarmland = await newFarmland.save();

  console.log('updated farmland: ', updatedFarmland)

  // -----------------------------------------------------------

  // save performance by user
  let userPerformance = await UserPerformance.findOne({ user: user?._id });

  if (!userPerformance) {
    let newUserPerformace = new UserPerformance({
      user: ObjectId(user?._id),
      district: user?.address?.district,
      farmlands: new Array(ObjectId(farmerId)),
    });
    await newUserPerformace.save();
  } else {
    userPerformance.farmlands.push(ObjectId(updatedFarmland._id));
    await userPerformance.save();
  }

  // -----------------------------------------------------
  // save performance by district
  let districtPerformance = await DistrictPerformance.findOne({ district: user?.address?.district });

  if (!districtPerformance) {
    let newDistrictPerformace = new DistrictPerformance({
      district: user?.address.district,
      farmlands: new Array(ObjectId(updatedFarmland._id)),
    });
    await newDistrictPerformace.save();
  } else {
    districtPerformance.farmlands.push(ObjectId(updatedFarmland._id));
    await districtPerformance.save();
  }

  return res.status(201).json(updatedFarmland);
});

//@desc
//@route
//@access
const getFarmlands = asyncHandler (async (req, res) => {
  const {
    query: { farmerId, farmlandId, district },
    user,
  } = req;

  let farmlands;
  if (!farmerId && !farmlandId && !district) {
    // get all registered farmlands
    farmlands = await Farmland.find({}).populate("farmer");
  } else if (farmerId && !farmlandId) {
    // get all farmlands belonging to the farmerId's owner
    farmlands = await Farmland.find({ farmer: ObjectId(farmerId) }).populate(
      "farmer"
    );
  } else if (farmerId && farmlandId) {
    // get one farmland by farmlandId and farmerId
    farmlands = await Farmland.find({
      _id: ObjectId(farmlandId),
      farmer: ObjectId(farmerId),
    }).populate("farmer");
  }
  else if (district) {
    farmlands = await Farmland.find({ district: district }).populate("farmer");
  }
  if (!farmlands) {
    res.status(404);
    throw new Error("Pomares nao encontrados!");
  }

  // sort by the update date
  if (farmlands) {
    farmlands = farmlands.sort(function (a, b) {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  }

  // let farmlands  = await
  return res.status(200).json(farmlands);
});

//@desc
//@route
//@access
const getFarmlandById = asyncHandler (async (req, res) => {
  const {
    params: { farmlandId },
  } = req;
    let foundFarmland = await getFarmlandByFarmlandIdService(farmlandId);
    return res.status(200).json({ status: "OK", data: foundFarmland });
});

//@desc
//@route
//@access
const updateFarmland = asyncHandler (async (req, res) => {
  const {
    body,
    params: { farmlandId },
  } = req;

  if (!farmlandId) {
    res.status(400);
    throw new Error("Deve especificar 'farmerId' e 'farmlandId'");
  }

    let updatedFarmland = await updateFarmlandService(farmlandId, body);
    if (!updatedFarmland) {
      res.status(404);
      throw new Error("Pomar nao econtrado");
    }

    return res.status(200).json({ status: "OK", data: updatedFarmland });
});

//@desc
//@route
//@access
const deleteFarmland = asyncHandler (async (req, res) => {
  const {
    params: { farmlandId },
    query: { farmerId },
  } = req;

  if (!farmerId || !farmlandId) {
    res.status(400);
    throw new Error("Deve especificar 'farmerId' e 'farmlandId'");
  }

    let deletionResult = await deleteFarmlandService(farmerId, farmlandId);
    return res
      .status(204)
      .json({ status: "OK", message: "Pomar eliminado", data: deletionResult });

});

export {
  addFarmland,
  getFarmlands,
  getFarmlandById,
  updateFarmland,
  deleteFarmland,
};
