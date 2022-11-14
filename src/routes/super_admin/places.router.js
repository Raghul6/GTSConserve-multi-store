import express  from 'express';

import { getAllPlaces,getCities,getAllCountry,getAllZone,getAllPostCode } from '../../controllers/super_admin/places/city_type.controller';


const placesRouter = express.Router({
  caseSensitive: true,
  strict: true
})


// placesRouter.get('/get_all_places',getAllPlaces)
placesRouter.get('/get_cities',getCities)
placesRouter.get('/country',getAllCountry)
placesRouter.get('/zone',getAllZone)
placesRouter.get('/post_code',getAllPostCode)

export default placesRouter

