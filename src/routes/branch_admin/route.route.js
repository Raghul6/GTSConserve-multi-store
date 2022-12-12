import express  from 'express';

import { getRoute,createRoute,updateRouteStatus,updateRoute,getUserMapping,getViewMapping,updateViewMapping } from "../../controllers/branch_admin/route/route.controller"


const rootRouter = express.Router({
  caseSensitive: true,
  strict: true
})
rootRouter.get('/get_route',getRoute)
rootRouter.post('/create_route',createRoute)
rootRouter.post('/update_route_status',updateRouteStatus)
rootRouter.post('/update_route',updateRoute)

//user mapping
rootRouter.get('/user_mapping',getUserMapping)


rootRouter.get('/view_mapping',getViewMapping)
rootRouter.post('/update_view_mapping',updateViewMapping)




export default rootRouter