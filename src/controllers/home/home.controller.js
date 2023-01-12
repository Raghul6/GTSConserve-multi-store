import { bannerList, getbanner, getService, generalBanner, PaymentMethod, getcategory, timeSlot, recommendedList } from "../../models/home.model"
import responseCode from "../../constants/responseCode"
import messageCode from "../../constants/messages"
import format from "date-fns/format"
import addMinutes from 'date-fns/addMinutes'
import logger from "../../logger/logger"
import { latLongValidator } from "../../services/validator.service"



// api/home/general_banner

export const getGeneralBanners = async (req, res) => {
    try {
        const payload = latLongValidator(req.body)
        const { latitude, longitude } = payload
        if (payload.status) {
            const response = await generalBanner(latitude, longitude)

            if (response.status === responseCode.SUCCESS) {
                res.status(responseCode.SUCCESS).json({ data: response.details, status: true })
            } else {
                res.status(response.status).json({ status: false, message: response.message })
            }
        } else {
            res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
        }
    } catch (error) {
        logger.error('Whooops! This broke with error: ', error)
        res.status(500).send('Error!')
    }
}

// Get Top Banner List

export const getTopBanner = async (req, res) => {
    try{
      const users = await bannerList()
      res.status(200).json({ status: true, data: users })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  }

// Get Bottom Banner

export const getBottomBanner = async (req, res) => {
    try{
      const users = await bannerList()
      res.status(200).json({ status: true, data: users })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  }
//   Get Intro Banner

export const getIntroBanners = async (req, res) => {
    try{
      const users = await getbanner()
      res.status(200).json({ status: true, data: users })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  }

// Service Api

export const getHomeService = async (req, res) => {
    try{
      const users = await getService()
      res.status(200).json({ status: true, data: users })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  }

// Get getCategories getcategory

export const getCategories = async (req, res) => {
    try{

      const payload = req.body
      const users = await getcategory(payload.id)
      res.status(200).json({ status: true, data: users })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  } 

// Get Cart Recommended List

export const getCartRecommendedList = async (req, res) => {
    try{

      const payload = req.body
      const users = await recommendedList(payload.id)
      res.status(200).json({ data: users, status: true, message:"ok" })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  }

// Get Time Slot

export const getTimeSlot = async (req, res) => {
    try{

      const payload = req.body
      const users = await timeSlot(payload.id)
      res.status(200).json({ data: users, status: true, message:"ok" })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  }

  export const getPaymentMethod = async (req, res) => {
    try{
      const users = await PaymentMethod()
      res.status(200).json({ status: true, data: users })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  }

// Bar Restaurant Banner List
// export const getBarRestaurantBanners = async (req, res) => {
//     try {
//         const payload = latLongValidator(req.body)
//         const { latitude, longitude } = payload
//         if (payload.status) {
//             const response = await barRestaurantBanner(latitude, longitude)
//             if (response.status === responseCode.SUCCESS) {
//                 res.status(responseCode.SUCCESS).json({ data: response.details, status: true })
//             } else {
//                 res.status(response.status).json({ status: false, message: response.message })
//             }
//         } else {
//             res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
//         }
//     } catch (error) {
//         logger.error('Whooops! This broke with error: ', error)
//         res.status(500).send('Error!')
//     }
// }
