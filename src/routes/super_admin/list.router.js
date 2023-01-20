import express from "express";

import { getCities,createCity,updateCity,updateCityStatus } from "../../controllers/super_admin/list/promo.controller";
// import { getAllCountry,createCountry,updateCountry,updateCountryStatus } from "../../controllers/super_admin/places/country.controller";
import { getAllZone,newZone,updateZone,updateZoneStatus } from "../../controllers/super_admin/list/membership.controller";
// import { getAllPostCode } from "../../controllers/super_admin/places/post_code.controller";

const listRouter = express.Router({
  // caseSensitive: true,
  strict: true,
});

//cities
listRouter.get("/promo_code", getCities);
listRouter.post("/create_city", createCity);
listRouter.post("/update_city", updateCity);
listRouter.post("/update_city_status", updateCityStatus);

// //country
// listRouter.get("/country", getAllCountry);
// listRouter.post("/create_country", createCountry);
// listRouter.post("/update_country", updateCountry);
// listRouter.post("/update_country_status", updateCountryStatus);

//zone
listRouter.get("/membership", getAllZone);
listRouter.post("/new_zone", newZone);
listRouter.post("/update_zone", updateZone);
listRouter.post("/update_zone_status", updateZoneStatus);

//post code
// listRouter.get("/post_code", getAllPostCode);

export default listRouter;
