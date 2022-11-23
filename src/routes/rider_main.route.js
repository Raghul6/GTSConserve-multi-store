import express from 'express';
import riderRouter from './rider/rider.route';

const mainRouter = express.Router({
    caseSensitive: true,
    strict: true,
  });
   
  const defaultRoutes = [
    {
      path: "/auth",
      route: riderRouter,
    },

  ];
  
  defaultRoutes.forEach((route) => {
    mainRouter.use(route.path, route.route);
  });
  
  export default mainRouter;