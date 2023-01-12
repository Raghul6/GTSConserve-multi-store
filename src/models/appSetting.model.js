import mysqlRequest from "../requests/mysqlRequest.request"
import queryBuilder from "../services/queryBuilder.service"
import responseCode from "../constants/responseCode"
export const getAppSettings = async () => {
    const appSettingQuerry = queryBuilder.select('key','value').from('app_settings').where({
      status: '1'
  }).toString()
  

    try {

    const updatedUserResponce = await mysqlRequest(appSettingQuerry)
    //console.log(updatedUserResponce.body)

    return { status: responseCode.SUCCESS, body: updatedUserResponce.body }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }