import responseCode from "../../constants/responseCode";

import knex from "../../services/db.service";
 
export const get_banner = async () => {
    const getbanner = await knex.select("name","image").from("banners").where({status : "1"})
    ;
    try {
      return { status: responseCode.SUCCESS, body: getbanner };
    } catch {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR };
    }
  };