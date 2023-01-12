// import mysqlRequest from "../requests/mysqlRequest.request"
// import queryBuilder from "../services/queryBuilder.service"
import responseCode from "../constants/responseCode"
import { userGroup } from "../constants/controls"
import knex from "../services/queryBuilder.service"


export const loginUser = async (phoneNumber) => {
  const checkPhoneNumber = await knex.select("*").from('user').where({
    user_phone_number: phoneNumber
  })
  try {
    const checkPhoneNumberResponce = await mysqlRequest(checkPhoneNumber)
    if (checkPhoneNumberResponce.status === true) {
      return checkPhoneNumberResponce
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const updateUserLocation = async (payload) => {
  const updateLocationQuery = queryBuilder.update({
    latitude: payload.latitude,
    longitude: payload.longitude,
  }).into('user').where({
    id: payload.userId
  }).toString()
  try {
    const updateLocationResponse = await mysqlRequest(updateLocationQuery)
    if (updateLocationResponse.status === true) {
      return { status: updateLocationResponse.status }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}


export const insertUser = async (payload, otp, today) => {

  const { phoneNumber, fcmToken, device, appOsFormat, version } = payload
  const query = await knex('user').insert({
    user_phone_number: phoneNumber,
    user_fcm_token: fcmToken,
    user_registration_date: today,
    last_updated_date: today,
    device: device,
    version: version,
    user_otp: otp,


    // refresh_token: refresh_token ,
    // user_alternate_phone_number: user_alternate_phone_number,
    // user_email: user_email,
    // issue_code: issue_code ,
    // referred_parent_id: referred_parent_id,
    // membership_id: memberhip_id,
    // user_name: user_name,

    // otp: otp,
    // device:device,
    // app_os_format:appOsFormat,
    // app_version:appVersion,
    // registration_date: today,
    // user_group_id: userGroup.USER_GROUP_ID,
    // online_status:'online',
    // reward_point_spent:0,
    // reward_point_earning :0,
    // reward_point_remaining:0,
    // app_version:'1.0',
    // status:'1',
    // isbooked:'0'
  })
  try {
    // const updatedUserResponce = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, body: query }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}
export const updateUserOtp = async (payload, otp) => {
  const { phoneNumber, fcmToken } = payload
  const query = knex('user').where({
    user_phone_number: phoneNumber
  }).update({
    'user_fcm_token': fcmToken,
    'user_otp': 9999,
    'refresh_token':null
  })
  try {
    // const updatedUserResponce = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, body: query }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}
export const verifyOtp = async (otp, userId, today) => {
  // const getLanguage = queryBuilder.select(['user_id']).from('user').where({
  //   user_id: userId,
  // }).toString()
  // const languageResponse = await mysqlRequest(getLanguage)
  const queryCheck = await knex('user').select('*').where({
    user_otp: otp,
    user_id: userId,
  })

  // console.log(queryCheck)
  // const verifyCheck = await mysqlRequest(queryCheck)
  let updateOtpQuery = '';
  if (queryCheck.length > 0) {
    // updateOtpQuery= queryBuilder.update({
    //   language_id:languageResponse.body[0].id,
    //   first_otp_verified_at:today,
    //   last_otp_verified_at:today
    //  }).into('').where({
    //   otp: otp,
    //   user_id: userId
    // }).toString()
    updateOtpQuery = await knex('user')
      .where({ user_otp: otp, user_id: userId })
      .update({ user_registration_date: today, last_updated_date: today })
  }
  else {
    updateOtpQuery = await knex('user')
      .where({ user_otp: otp, user_id: userId, })
      .update({ last_updated_date: today })
  }
  // const updateOtpVerify = await mysqlRequest(updateOtpQuery)

  const query = await knex('user')
    .select('user_id')
    .where({ user_otp: otp, user_id: userId, })
  try {
    // const response = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, data: query }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}
export const updateUser = async (payload, userId) => {

  const query = queryBuilder.update({
    name: payload.name,
    email: payload.email,
    profile_photo_path: payload.profilePhoto,
    online_status: payload.onlineStatus,
    language_id: payload.languageId,
  }).into('user').where({
    id: userId
  }).toString()
  try {
    const updatedUserResponce = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, body: updatedUserResponce }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}
export const updateUserLanguage = async (languageId, userId) => {
  const query = queryBuilder.update({
    language_id: languageId,
  }).into('user').where({
    id: userId
  }).toString()
  try {
    const updatedUserResponce = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, body: updatedUserResponce }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}
export const updateUserToken = async (refreshToken, userId) => {
  const query = await knex('user')
    .update({ refresh_token: refreshToken, })
    .where({ user_id: userId })
  try {
    // const updatedUserResponce = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, body: query }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}
export const getUserToken = async (userId) => {
  const query = queryBuilder.select('refresh_token', 'language_id').from('user').where({
    id: userId
  }).toString()
  try {
    const updatedUserResponce = await mysqlRequest(query)

    return { status: responseCode.SUCCESS, refreshToken: updatedUserResponce.body[0].refresh_token, languageId: updatedUserResponce.body[0].language_id }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}
export const addUser = async (payload) => {
  const query = queryBuilder.insert({
    user_address_id: payload.user_address_id,
    user_id: payload.user_id,
    user_address_details: user_address_details,
    user_address_name: user_address_name,
    user_address_landmark: user_address_landmark,
    user_address_latitude: user_address_latitude,
    user_address_longitude: user_address_longitude,
    alternate_mobile: alternate_mobile
  }).into('user_address').toString()
  // console.log(user_address_id)
  try {
    const response = await mysqlRequest(query)

    return { status: responseCode.SUCCESS, response: response.body[0] }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const getUser = async (userId) => {
  const query = queryBuilder.select('*').from('user_address').where({
    user_id: userId
  }).toString()
  try {
    const response = await mysqlRequest(query)

    return { status: responseCode.SUCCESS, response: response.body[0] }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const getBranch = async () => {
  const query = queryBuilder.select("*").from('branch')
    .toString()
  try {
    const response = await mysqlRequest(query)

    return { status: responseCode.SUCCESS, response: response.body }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const getPromo = async () => {
  const query = queryBuilder.select('*').from('offer')
    .toString()
  try {
    const response = await mysqlRequest(query)

    return { status: responseCode.SUCCESS, response: response.body }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const getSinglecoupon = async () => {
  const query = queryBuilder.select('*').from('offer').toString()
  try {
    const response = await mysqlRequest(query)

    return { status: responseCode.SUCCESS, response: response.body[0] }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const deleteUser = async (userId) => {
  const query = queryBuilder.delete('*').from('user_address').where({
    user_id: userId
  }).toString()
  try {
    const response = await mysqlRequest(query)

    return { status: responseCode.SUCCESS, response: response.body[0] }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const getAccountModal = async (payload) => {
  const { userId } = payload
  const getAccountQuery = queryBuilder.select(['mobile_number']).from('user').where({
    id: userId
  }).toString()

  try {
    const responce = await mysqlRequest(getAccountQuery)

    if (responce.body.length) {
      const { mobile_number } = responce.body[0]

      return { status: responseCode.SUCCESS, mobileNumber: mobile_number }
    } else {
      return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: 'User not found' }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const addFavouriteModel = async (userId, favouriteType, barId) => {
  const query = queryBuilder.select(['id']).from('user').where({
    id: userId
  }).toString()

  try {
    const response = await mysqlRequest(query)

    if (response.status) {
      const query1 = queryBuilder.select(['*']).from('favourites').where({
        user_id: userId,
        favourite_type: favouriteType,
        bar_restaurant_id: barId
      }).toString()

      const response1 = await mysqlRequest(query1)

      let favMsg
      let query2

      if (response1.body.length) {
        query2 = queryBuilder.delete().from('favourites').where({
          user_id: userId,
          favourite_type: favouriteType,
          bar_restaurant_id: barId
        }).toString()

        favMsg = "Favourite Removed"
      } else {
        query2 = queryBuilder.insert({
          user_id: userId,
          favourite_type: favouriteType,
          bar_restaurant_id: barId
        }).into('favourites').toString()

        favMsg = "Favourite Added"
      }

      const response2 = await mysqlRequest(query2)

      if (response2.status) {
        return { status: responseCode.SUCCESS, message: favMsg }
      } else {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: "Internal Server Error" }
      }
    } else {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: "Internal Server Error" }
    }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}

export const getFavouriteModel = async (userId, latitude, longitude) => {
  let barRestaurantTable = queryBuilder.raw(`SELECT bar_restaurants.*,bar_tie_up.slug,  ( 3959 * acos( ( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) ) + ( sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) ) * 1.609344 AS distance FROM bar_restaurants JOIN favourites ON favourites.bar_restaurant_id = bar_restaurants.id JOIN bar_tie_up ON bar_restaurants.bar_tie_up_id = bar_tie_up.id WHERE bar_restaurants.status='1' AND favourites.user_id = ${userId} HAVING distance <= 0.005 ORDER BY distance ASC`).toString()

  try {
    const response = await mysqlRequest(barRestaurantTable)

    if (response.status) {
      return { status: responseCode.SUCCESS, details: response }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}

export const getBarPaymentMode = async (barId) => {
  let paymentGatewayTable = queryBuilder.select('payment_gateways.id', 'payment_gateways.gatewayname', 'payment_gateways.image', 'payment_gateways.instructions', 'payment_gateways.status').from('payment_gateways').join('bar_payment_gateways', { 'payment_gateways.id': 'bar_payment_gateways.payment_gateway_id' })
    .where({
      'bar_payment_gateways.bar_restaurant_id': barId,
      'payment_gateways.status': '1'
    }).toString()

  try {
    const response = await mysqlRequest(paymentGatewayTable)

    if (response.status) {
      return { status: responseCode.SUCCESS, details: response }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}

export const userGoingRequest = async (userId, barId, goingStatus) => {
  try {
    if (goingStatus == "current") {
      let barBookingTable = queryBuilder.select('*').from('bar_bookings').where({
        user_id: userId,
        status: goingStatus
      }).toString()

      let response = await mysqlRequest(barBookingTable)

      if (response.status) {
        if (response.body.length) {
          let barBookingTable1 = queryBuilder.update({
            status: "cancel"
          }).into('bar_bookings').where({
            user_id: userId,
            status: goingStatus
          }).toString()

          let response1 = await mysqlRequest(barBookingTable1)

          if (response1.status) {
            let barBookingTable2 = queryBuilder.insert({
              user_id: userId,
              bar_restaurant_id: barId,
              status: goingStatus
            }).into('bar_bookings').toString()

            let response2 = await mysqlRequest(barBookingTable2)

            if (response2.status) {
              return { status: responseCode.SUCCESS }
            }
          }
        } else {
          let barBookingTable3 = queryBuilder.insert({
            user_id: userId,
            bar_restaurant_id: barId,
            status: goingStatus
          }).into('bar_bookings').toString()

          let response3 = await mysqlRequest(barBookingTable3)

          if (response3.status) {
            return { status: responseCode.SUCCESS }
          }
        }
      }
    } else if (goingStatus == "cancel") {
      let barBookingTable = queryBuilder.select('*').from('bar_bookings').where({
        user_id: userId,
        bar_restaurant_id: barId,
        status: "Current"
      }).toString()

      let response = await mysqlRequest(barBookingTable)

      if (response.status) {
        if (response.body.length) {
          let barBookingTable1 = queryBuilder.update({
            status: "cancel"
          }).into('bar_bookings').where({
            user_id: userId,
            bar_restaurant_id: barId,
            status: "Current"
          }).toString()

          let response1 = await mysqlRequest(barBookingTable1)

          if (response1.status) {
            return { status: responseCode.SUCCESS }
          }
        } else {
          return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: "No current request for this bar" }
        }
      }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}