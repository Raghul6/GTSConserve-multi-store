import express from 'express';
import { getRiderdetails, login, updateRiderstatus } from "../../controllers/rider/rider.controller"

const loginRouter = express.Router({
    caseSensitive: true,
    strict: true,
});

loginRouter.post("/login",login)
loginRouter.get("/rider_details",getRiderdetails)
loginRouter.post("/update_rider_status",updateRiderstatus);


export default loginRouter