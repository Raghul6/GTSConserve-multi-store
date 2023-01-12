import mysqlRequest from "../requests/mysqlRequest.request"
import queryBuilder from "../services/queryBuilder.service"
import responseCode from "../constants/responseCode"
import { response } from "express"
import distanceCalculator, { SUPPORTED_UNIT } from 'distance-calculator-js';


export const sendBuddyRequest = async (payload) => {

  try {
    const requestCheckQuery = queryBuilder.select('*').from('buddy_request').where({
      sender_id: payload.userId,
      receiver_id: payload.request_receiver_user_id
    }).toString()

    let requestQuery;

    const requestCheckResponse = await mysqlRequest(requestCheckQuery)
    if (requestCheckResponse.body.length) {

      if (requestCheckResponse.body[0].request_count == 3) {
        return { status: responseCode.SUCCESS, body: 'limit Reached' }
      }
      else {
        if (requestCheckResponse.body[0].request_status != 'pending') {
          requestQuery = queryBuilder.update({
            mobile_number: payload.mobile_number,
            comments: payload.comments,
            request_status: 'pending',
            request_count: requestCheckResponse.body[0].request_count++
          }).into('buddy_request').where({
            sender_id: payload.userId,
            receiver_id: payload.request_receiver_user_id
          }).toString()
        }
        else {
          return { status: responseCode.SUCCESS, body: 'Your request is already pending' }
        }
      }
    }
    else {

      requestQuery = queryBuilder.insert({
        receiver_id: payload.request_receiver_user_id,
        mobile_number: payload.mobile_number,
        comments: payload.comments,
        request_status: 'pending',
        sender_id: payload.userId,
        request_count: '1'
      }).into('buddy_request').toString()
    }
    const requsetResponse = await mysqlRequest(requestQuery)
    console.log(requsetResponse)
    if (requsetResponse.status) {
      return { status: responseCode.SUCCESS, body: 'Your request is Sent' }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const getBuddy = async (userId) => {
  let query = queryBuilder.select('*').from('buddy_list').where({
    id: userId
  }).toString()
  try {
    const response = await mysqlRequest(query)

    if (response.status) {
      return { status: responseCode.SUCCESS, details: response }
    } else {
      return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: 'No list found' }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}

export const sendBlockRequest = async (payload) => {
  console.log(payload)
  let query = ''
  if (payload.status == 'blocked') {


    query = queryBuilder.update({
      isblocked: "1",
    }).into('buddy_list').where({
      user_id: payload.userId,
      friend_id: payload.friend_id,
      blocked_by: payload.userId
    }).toString()
  }
  else {
    query = queryBuilder.update({
      isblocked: "0",
    }).into('buddy_list').where({
      user_id: payload.userId,
      friend_id: payload.friend_id,
      blocked_by: payload.userId

    }).toString()
  }

  try {
    const response = await mysqlRequest(query)
    if (response.status) {
      return { status: responseCode.SUCCESS, details: response }
    } else {
      return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: 'Block request not found' }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}

export const nearByBuddy = async (latitude, longitude) => {
  let buddyUserTable = queryBuilder.select('*').from('users').where({
    status: '1'
  }).toString()
  try {
    const userTable = await mysqlRequest(buddyUserTable)

    if (userTable.body.length) {
      const userArray = []

      for (const allUser of userTable.body) {
        const userId = allUser.id

        let buddyTable = queryBuilder.select('*').from('buddy_list').where({
          id: userId,
          user_id: userId,
        }).toString()

        const getTable = await mysqlRequest(buddyTable)

        const userLatitude = getTable.body[0].latitude
        const userLongitude = getTable.body[0].longitude

        const userLocation = { lat: latitude, long: longitude }
        const getLocation = { lat: userLatitude, long: userLongitude }

        const km = distanceCalculator.calculate(userLocation, getLocation, 'km');
        console.log(km)
        if (km <= 0.005) {
          userArray.push({
            user_id: allUser.userId
          })
        }
        console.log(userArray)
      }

      if (userArray.length) {
        return { status: responseCode.SUCCESS, details: userArray }
      }
      else {
        return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: 'No buddy found' }
      }
    } else {
      return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: 'No buddy found' }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}

export const getUpdate = async (userId) => {
  let updateQuery = queryBuilder.select('*').from('buddy_request').where({
    sender_id: userId,
    receiver_id: userId
  }).toString()

  try {

    const response = await mysqlRequest(updateQuery)
    // console.log(response)
    if (response.body.length) {
      if (response.body[0].request_status == "pending") {
        return { status: responseCode.SUCCESS, message: "Request pending" }
      } else
        if (response.body[0].request_status == "cancel") {
          console.log(response.body)
          return { status: responseCode.SUCCESS, message: "Request cancelled" }
        }
    }
    else {
      return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: 'No list found' }
    }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}

export const buddyGroup = async (groupName, user_id) => {
  let orderRatingTable = queryBuilder.insert({
    user_id: user_id,
    group_name: groupName,
  }).into("buddy_groups").toString()

  const response = await mysqlRequest(orderRatingTable)

  const query = queryBuilder.select(['buddy_group_id', 'user_id', 'buddy_id']).from('buddy_group_members').where({
    id: user_id
  }).toString()
  console.log(query)

  try {
    const response = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, data: response }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
  }
}

export const buddyMember = async (buddy_id) => {
  const query = queryBuilder.select('*').from('buddy_group_members').where({
    id: buddy_id
  }).toString()
  try {
    const response = await mysqlRequest(query)

    return { status: responseCode.SUCCESS, response: response }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const updateRename = async (group_name, user_id) => {
  const query = queryBuilder.update({
    group_name: group_name
  }).into('buddy_groups').where({
    id: user_id
  }).toString()
  try {
    const updatedUserResponce = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, body: updatedUserResponce }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const removeBuddy = async (buddy_id, buddy_group_id) => {
  const query = queryBuilder.delete().from('buddy_group_members').where({
    buddy_id: buddy_id,
    buddy_group_id: buddy_group_id
  }).toString()
  console.log(query)
  try {
    const updatedUserResponce = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, body: updatedUserResponce }
  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}

export const buddyGroupRemove = async (userId) => {
  const query = queryBuilder.delete().from('buddy_groups').where({
    user_id: userId,
    status: '1'
  }).toString()
  try {
    const response = await mysqlRequest(query)
    return { status: responseCode.SUCCESS, response: response }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}


export const getGroup = async (userId) => {
  const query = queryBuilder.raw(`SELECT buddy_groups.group_name,buddy_group_members.buddy_group_id,buddy_list.isblocked
  FROM buddy_groups
  INNER JOIN buddy_group_members ON buddy_groups.user_id=buddy_group_members.buddy_group_id
  INNER JOIN buddy_list ON buddy_group_members.buddy_group_id=buddy_group_members.buddy_group_id`)

  try {
    const response = await mysqlRequest(query)


    return { status: responseCode.SUCCESS, response: response }

  } catch (error) {
    return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
  }
}