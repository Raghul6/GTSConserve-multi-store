import express from 'express';



const mainRouter = express.Router({
    caseSensitive: true,
    strict: true,
})

const defaultRoutes = [
    {
        path: "/",
        route: riderRouter
    }
];

defaultRoutes.forEach((route)=>{
    mainRouter.use(route.path, route.route)
});

export default mainRouter