// export const getAppSettings = async (req,res) => {
//     try {
//         res.render("super_admin/settings/app_settings")
//     } catch (error) {
        
//     }
// }
import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";


export const getAppSettings = async (req, res) => {
    try {
      let loading = true;
      const { searchKeyword } = req.query;
  
      let data_length = [];
  
      if (searchKeyword) {
        const search_data_length = await knex.raw(
          `SELECT name,key,value FROM app_settings WHERE name LIKE '%${searchKeyword}%'`
        );
  
        data_length = search_data_length[0];
  
        if (data_length.length === 0) {
          loading = false;
          req.query.searchKeyword = "";
          req.flash("error", "No App Found");
          return res.redirect("super_admin/settings/app_settings");
        }
      } else {
        data_length = await knex("app_settings").select("id");
      }
  
  
      if (data_length.length === 0) {
        loading = false
        return res.render("super_admin/settings/app_settings", {
          data: data_length,
          searchKeyword,
         
        });
      }
  
  
      let {
        startingLimit,
        page,
        resultsPerPage,
        numberOfPages,
        iterator,
        endingLink,
      } = await getPageNumber(req,res, data_length, "settings/app_settings");
  
      let results;
      let is_search = false;
      if (searchKeyword) {
        results = await knex.raw(
          `SELECT name FROM app_settings  WHERE name LIKE '%${searchKeyword}%' LIMIT ${startingLimit},${resultsPerPage}`
        );
        is_search = true;
      } else {
        results = await knex.raw(
          `SELECT name FROM app_settings LIMIT ${startingLimit},${resultsPerPage}`
        );
      }
  
      const data = results[0];
  
      for (let i = 0; i < data.length; i++) {
        data[i].key = results.key + data[i].key;
      }
  
      loading = false;
      res.render("super_admin/settings/app_settings", {
        data: data,
        page,
        iterator,
        endingLink,
        numberOfPages,
        is_search,
        searchKeyword,
        loading,
      });
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const createAppsettings  = async (req, res) => {
    try {
      const { name } = req.body;
  
      if (!name) {
        req.flash("error", "Name is missing");
        return res.redirect("super_admin/settings/app_settings");
      }
  
      if (!key) {
        req.flash("error", "key is missing");
        return res.redirect("super_admin/settings/app_settings");
      }
      if (!value) {
        req.flash("error", "value is missing");
        return res.redirect("super_admin/settings/app_settings");
      }
      const image = req.file.destination.slice(1) + "/" + req.file.filename;
  
      await knex("product_type").insert({ name, image });
      req.flash("success", "App Created SuccessFully");
      res.redirect("super_admin/settings/app_settings");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };
  