import express  from 'express';

import { getRoute,createRoute,updateRoute,updateRouteStatus } from "../../controllers/branch_admin/root/root.controller"


const rootRouter = express.Router({
  caseSensitive: true,
  strict: true
})
rootRouter.get('/get_route',getRoute)
rootRouter.post('/create_route',createRoute)
rootRouter.post('/update_route',updateRoute)
rootRouter.post('/update_route_status',updateRouteStatus)
// rootRouter.post('/login', loginHandler)




export default rootRouter