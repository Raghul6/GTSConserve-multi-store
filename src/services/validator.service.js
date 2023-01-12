import { phoneNumberValidator, integerValidator } from "../utils/helper.util"
import distanceCalculator from 'distance-calculator-js'
import messages from "../constants/messages"

export const loginValidator = (payload) => {
  const phoneNumber = payload.mobile_number ?? null
  const fcmToken = payload.fcm_token ?? null
  const device = payload.device ?? null
  const version = payload.app_version ?? null
  if (phoneNumber && fcmToken && device && version) {
    if (phoneNumberValidator(phoneNumber)) {
      return { status: true, phoneNumber, fcmToken, device, version }
    } else {
      return { status: false, message: "Invalid phone number" }
    }
  } else {
    return { status: false, message: "Mandatory fields missing" }
  }
}
export const profileUpdateValidator = (payload) => {
  const name = payload.name ?? null
  const email = payload.email ?? null
  const profilePhoto = payload.profile_photo_path ?? null
  const onlineStatus = payload.online_status ?? null
  const languageId = payload.language_id ?? null

  if (name && email && profilePhoto && onlineStatus && languageId) {

    return { status: true, name, email, profilePhoto, onlineStatus, languageId }

  } else {
    return { status: false, message: messages.PROFILE_UPDATE }

  }
}

export const verifyOtpValidator = (payload) => {
  const otp = payload.otp ?? null
  const userId = payload.user_id ?? null
  if (otp && userId) {
    if (integerValidator(otp)) {
      return { status: true, otp, userId }
    } else {
      return { status: false, message: "Invalid Otp" }
    }
  } else {
    if (!otp) {
      return { status: false, message: "Please Fill the OTP" }
    }
    else {
      return { status: false, message: "Mandatory fields missing" }
    }
  }
}

export const latLongValidator = (payload) => {
  const latitude = payload.latitude ?? null
  const longitude = payload.longitude ?? null

  if (latitude && longitude) {
    if (integerValidator(latitude) && integerValidator(longitude)) {
      return { status: true, latitude, longitude }
    } else {
      return { status: false, message: "Invalid latitude or longitude" }
    }
  } else {
    return { status: false, message: "Mandatory fields missing" }
  }
}

export const getKM = (userlocation, branchLocation) => {
  const km = distanceCalculator.calculate(userlocation, branchLocation, "km")
  return km
}


export const userAddressValidator = (payload) => {
  const address_details = payload.address ?? null
  const address_name = payload.address_name ?? null
  const address_landmark = payload.landmark ?? null
  const alternate_mobile = payload.alternate_mobile ?? null
  const address_latitude = payload.latitude ?? null
  const address_longitude = payload.longitude ?? null
  const userId = payload.userId ?? null

  if (address_details && address_name && address_landmark && alternate_mobile && address_latitude && address_longitude && userId) {

    return { status: true, address_details, address_name, address_landmark, alternate_mobile, address_latitude, address_longitude , userId }

  } else {
    return { status: false, message: messages.PROFILE_UPDATE }

  }
}