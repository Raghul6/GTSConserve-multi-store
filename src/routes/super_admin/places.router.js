import express from "express";

import { getCities } from "../../controllers/super_admin/places/city.controller";
import { getAllCountry } from "../../controllers/super_admin/places/country.controller";
import { getAllZone } from "../../controllers/super_admin/places/zone.controller";
import { getAllPostCode } from "../../controllers/super_admin/places/post_code.controller";

const placesRouter = express.Router({
  caseSensitive: true,
  strict: true,
});

//cities
placesRouter.get("/get_cities", getCities);

//country
placesRouter.get("/country", getAllCountry);

//zone
placesRouter.get("/zone", getAllZone);

//post code
placesRouter.get("/post_code", getAllPostCode);

export default placesRouter;
