import express from 'express';
import { login } from '../../controllers/rider/rider.controller'

const riderRouter = express.Router({
    caseSensitive: true,
    strict: true,
});

riderRouter.post("/login",login)


export default riderRouter