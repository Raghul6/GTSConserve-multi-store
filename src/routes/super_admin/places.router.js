import express  from 'express';

import { getAllPlaces } from '../../controllers/super_admin/places/city_type.controller';


const placesRouter = express.Router({
  caseSensitive: true,
  strict: true
})


placesRouter.get('/get_all_places',getAllPlaces)


export default placesRouter

