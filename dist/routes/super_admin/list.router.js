"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _city = require("../../controllers/super_admin/list/city.controller");
var _country = require("../../controllers/super_admin/places/country.controller");
var _zone = require("../../controllers/super_admin/list/zone.controller");
var _post_code = require("../../controllers/super_admin/places/post_code.controller");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var listRouter = _express["default"].Router({
  caseSensitive: true,
  strict: true
});

//cities
listRouter.get("/promo_code", _city.getCities);
listRouter.post("/create_city", _city.createCity);
listRouter.post("/update_city", _city.updateCity);
listRouter.post("/update_city_status", _city.updateCityStatus);

// //country
// listRouter.get("/country", getAllCountry);
// listRouter.post("/create_country", createCountry);
// listRouter.post("/update_country", updateCountry);
// listRouter.post("/update_country_status", updateCountryStatus);

//zone
listRouter.get("/zone", _zone.getAllZone);
listRouter.post("/new_zone", _zone.newZone);
listRouter.post("/update_zone", _zone.updateZone);
listRouter.post("/update_zone_status", _zone.updateZoneStatus);

//post code
// listRouter.get("/post_code", getAllPostCode);
var _default = listRouter;
exports["default"] = _default;