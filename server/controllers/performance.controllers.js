import mongoose from "mongoose";
import UserPerformance from "../models/userPerformance.model.js";
import DistrictPerformance from "../models/districtPerformance.model.js"
import { getPerformanceService } from "../services/performance.services.js";
import asyncHandler from "express-async-handler";


const ObjectId = mongoose.Types.ObjectId;

const getPerformances = asyncHandler (async (req, res) => {
  const { userId, district } = req.query;
  let userPerformances;
  let districtPerformances;



  // if (key === "farmers") {
  //   performances = await UserPerformance.find({}).select("farmers").populate("farmers");
  // } else if (key === "farmlands") {
  //   performances = await UserPerformance.find({})
  //     .select("farmlands")
  //     .populate("farmlands");
  // } else if (key === "monitorings") {
  //   performances = await Performance.find({})
  //     .select("monitorings")
  //     .populate("monitorings");
  // } else {
    userPerformances = await UserPerformance.findOne({user: ObjectId(userId), district});
    districtPerformances = await DistrictPerformance.findOne({ district, });
  // } 

  const performance = {
    user: userPerformances,
    district: districtPerformances,
  }
  
  return res.status(200).json(performance);
});


export  {
    getPerformances,
}