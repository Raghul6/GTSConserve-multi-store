import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";


export const updateRoute = async (req, res) => {
  try {
    const { starting_point, ending_point, city_id, rider_id, id } = req.body;

    if (!starting_point) {
      req.flash("error", "Staring Point is missing");
      return res.redirect("/branch_admin/route/get_route");
    }
    if (!ending_point) {
      req.flash("error", "Ending Point is missing");
      return res.redirect("/branch_admin/route/get_route");
    }

    let query = {};

    query.starting_point = starting_point;
    query.ending_point = ending_point;
    if (city_id) {
      query.city_id = city_id;
    }
    if (rider_id) {
      query.rider_id = rider_id;
    }

    await knex("routes").update(query).where({ id: id });

    req.flash("success", "Updated SuccessFully");
    res.redirect("/branch_admin/route/get_route");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateRouteStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("routes").update({ status: "0" }).where({ id: id });
    } else {
      await knex("routes").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    res.redirect("/branch_admin/route/get_route");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createRoute = async (req, res) => {
  try {
    const { starting_point, ending_point, admin_id, city_id, rider_id } =
      req.body;
    if (!starting_point) {
      req.flash("error", "starting_point is missing");
      return res.redirect("/branch_admin/route/get_route");
    }

    if (!ending_point) {
      req.flash("error", "ending_point is missing");
      return res.redirect("/branch_admin/route/get_route");
    }

    if (!city_id) {
      req.flash("error", "City  is missing");
      return res.redirect("/branch_admin/route/get_route");
    }

    let query = {}
    if (rider_id) {
      query.rider_id = rider_id
    }

    query.starting_point = starting_point
    query.ending_point = ending_point
    query.city_id = city_id
    query.branch_id = admin_id

    await knex("routes").insert(query);

    req.flash("success", "Successfully Created");
    res.redirect("/branch_admin/route/get_route");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getRoute = async (req, res) => {
  try {
    const { admin_id } = req.body;
    let loading = true;
    const { searchKeyword } = req.query;

    let data_length = [];

    if (searchKeyword) {
      const search_data_length = await knex.raw(
        `SELECT id,rider_id FROM routes WHERE branch_id = ${admin_id} AND starting_point LIKE '%${searchKeyword}%' OR ending_point LIKE '%${searchKeyword}%'`
      );

      data_length = search_data_length[0];

      if (data_length.length === 0) {
        loading = false;
        req.query.searchKeyword = "";
        req.flash("error", "No Route Found");
        return res.redirect("/branch_admin/route/get_route");
      }
    } else {
      data_length = await knex("routes")
        .select("id", "rider_id")
        .where({ branch_id: admin_id });
    }

    const cities = await knex("cities")
      .select("id", "name")
      .where({ status: "1" });

    let is_rider = [];

    if (data_length.length !== 0) {
      data_length.map((data) => {
        if(data.rider_id){

          is_rider.push(data.rider_id);
        }
      });
    }

    const riders = await knex("rider_details")
      .select("id", "name")
      .where({ status: "1", branch_id: admin_id })
      .whereNotIn("id", is_rider);

    if (data_length.length === 0) {
      loading = false;
      return res.render("branch_admin/route/get_route", {
        data: data_length,
        searchKeyword,
        cities,
        riders,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "route/get_route");

    let results;
    let is_search = false;
    if (searchKeyword) {
      results = await knex.raw(
        `SELECT routes.id,routes.starting_point,routes.ending_point,routes.status,routes.rider_id,
        cities.id as city_id, rider_details.id as rider_id,
        rider_details.name as rider_name,cities.name as city_name FROM routes 
        LEFT JOIN rider_details ON rider_details.id = routes.rider_id
        LEFT JOIN cities ON cities.id = routes.city_id
        WHERE routes.branch_id = ${admin_id} 
        AND routes.starting_point LIKE '%${searchKeyword}%' OR routes.ending_point LIKE '%${searchKeyword}%' 
        LIMIT ${startingLimit},${resultsPerPage}`
      );
      is_search = true;
    } else {
      results = await knex.raw(
        `SELECT routes.id,routes.starting_point,routes.ending_point,routes.status,routes.rider_id,
        cities.id as city_id, rider_details.id as rider_id,
        rider_details.name as rider_name,cities.name as city_name FROM routes 
        LEFT JOIN rider_details ON rider_details.id = routes.rider_id
        LEFT JOIN cities ON cities.id = routes.city_id
        WHERE routes.branch_id = ${admin_id}  LIMIT ${startingLimit},${resultsPerPage}`
      );
    }

    const data = results[0];
console.log(riders)
    loading = false;
    res.render("branch_admin/route/get_route", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,
      is_search,
      searchKeyword,
      loading,
      cities,
      riders,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
