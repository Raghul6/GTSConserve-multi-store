import { phoneNumberValidator, integerValidator } from "../utils/helper.util"

import messages from "../constants/messages"

export const loginValidator = (payload) => {
  const mobile_number = payload.mobile_number ?? null
  const fcmToken = payload.fcm_token ?? null
  const device = payload.device ?? null
  const appOsFormat = payload.app_os_format ?? null
  const appVersion = payload.app_version ?? null
  // const email = payload.email ?? null
  if (mobile_number && fcmToken && device && appOsFormat&&appVersion) {
    if (phoneNumberValidator(mobile_number)) {
        return { status: true, mobile_number, fcmToken, device, appOsFormat }
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

        return { status: true, name, email, profilePhoto, onlineStatus,languageId }
   
  } else {
    return { status: false, message:messages.PROFILE_UPDATE }

   }
}

export const verifyOtpValidator = (payload) => {
  const otp = payload.otp ?? null
  const userId = payload.user_id ?? null
  if (otp && userId ) {
    if (integerValidator(otp)) {
        return { status: true, otp, userId }
    } else {
      return { status: false, message: "Invalid Otp" }
    }
  } else {
    if(!otp){
      return { status: false, message: "Please Fill the OTP" }
    }
    else{
    return { status: false, message: "Mandatory fields missing" }
    }
  }
}

export const latLongValidator = (payload) => {
	const latitude = payload.latitude ?? null
	const longitude = payload.longitude ?? null

	if(latitude && longitude){
		if(integerValidator(latitude) && integerValidator(longitude)){
			return { status: true, latitude, longitude }
		} else{
			return { status: false, message: "Invalid latitude or longitude" }
		}
	} else{
		return { status: false, message: "Mandatory fields missing" }
	}
}

export const userAddressValidator = (payload) => {
  // console.log(payload)
  const address_details = payload.address_details ?? null
  const address_title = payload.address_title ?? null
  const address_landmark = payload.address_landmark ?? null
  // const address_type = payload.type ?? null
  const user_id = payload.user_id ?? null
  // const alternate_mobile = payload.alternate_mobile ?? null
  // const address_latitude = payload.latitude ?? null
  // const address_longitude = payload.longitude ?? null

  if (address_details &&  address_landmark && address_title  && user_id) {

    return { status: true, address_details, address_landmark, user_id }

  } else {
    return { status: false, message: "error" }

  }
}