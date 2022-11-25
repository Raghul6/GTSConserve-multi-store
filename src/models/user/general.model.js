import responseCode from "../../constants/responseCode";

import knex from "../../services/db.service";

export const get_AppSettings = async () => {
    const appSetting= await knex.select('key','value').from('app_settings')
    console.log(appSetting)

    try {
    return { status: responseCode.SUCCESS, body: appSetting }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error}
    }
  }