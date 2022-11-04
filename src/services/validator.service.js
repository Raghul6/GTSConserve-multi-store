import { phoneNumberValidator, integerValidator } from "../utils/helper.util"
import distanceCalculator from 'distance-calculator-js'

import messages from "../constants/messages"
export const loginValidator = (payload) => {
  const mobile_number = payload.mobile_number ?? null
  const fcmToken = payload.fcm_token ?? null
  const device = payload.device ?? null
  const appOsFormat = payload.app_os_format ?? null
  const appVersion = payload.app_version ?? null
  if (mobile_number && fcmToken && device && appOsFormat&&appVersion) {
    if (phoneNumberValidator(mobile_number)) {
        return { status: true, mobile_number, fcmToken, device, appOsFormat,appVersion }
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
  const otp = payload.otp 
  const userId = payload.user_id 
  if (otp && userId ) {
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

export const getHospitalKM = (userLocation, hospitalLocation) => {
  const km = distanceCalculator.calculate(userLocation, hospitalLocation, "km")
  return km

}

export const getDiagnosticsKM = (userLocation, diagnosticsLocation) => {
  const km = distanceCalculator.calculate(userLocation, diagnosticsLocation, "km")
  return km

}

export const getAlternativeMedKM = (userlocation,alternativeMedLocation) => {
  const km = distanceCalculator.calculate(userlocation,alternativeMedLocation, "km")
  return km
}
export const getMedicalCenterKM = (userlocation,alternativeMedLocation) => {
  const km = distanceCalculator.calculate(userlocation,alternativeMedLocation, "km")
  return km
}


export const userRelativeValidator = (payload) => {
  const name = payload.name ?? null
  const gender = payload.gender ?? null
  const relationship = payload.relationship ?? null
  const mobile_number = payload.mobile_number ?? null



  if (name && gender &&  relationship && mobile_number) {

    return { status: true }

  } else {
    return { status: false, message: "Mandatory fields missing" }
  }
}

export const userAppoinmentValidator = (payload) => {
  const service_id = payload.service_id ?? null
  const user_relative_id = payload.user_relative_id ?? null
  // const description = payload.description ?? null
  
  if (  service_id &&  user_relative_id  ) {

    return { status: true }

  } else {
    return { status: false, message: "Mandatory fields missing" }
  }
}
export const joinMedaggValidator = (payload) => {
  const name = payload.name ?? null
  const email = payload.email ?? null
  const message = payload.message ?? null
  const mobile_number = payload.mobile_number ?? null



  if (name && email && message && mobile_number) {

    return { status: true }

  } else {
    return { status: false, message: "Mandatory fields missing" }
  }
}