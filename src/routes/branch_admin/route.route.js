import express  from 'express';

import { getRoute,createRoute,updateRouteStatus,updateRoute } from "../../controllers/branch_admin/route/route.controller"


const rootRouter = express.Router({
  caseSensitive: true,
  strict: true
})
rootRouter.get('/get_route',getRoute)
rootRouter.post('/create_route',createRoute)
rootRouter.post('/update_route_status',updateRouteStatus)
rootRouter.post('/update_route',updateRoute)





export default rootRouter