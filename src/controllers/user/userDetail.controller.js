
import { updateUser, updateUserLanguage, getUser, addFavouriteModel, getFavouriteModel, getBarPaymentMode, userGoingRequest,updateUserLocation, addUser, deleteUser, getBranch, getPromo, getSinglecoupon } from "../../models/user.model"
import { happyHours, barRestaurantRules, barOffers } from "../../models/home.model"
import {latLongValidator, profileUpdateValidator,userAddressValidator} from "../../services/validator.service"
import responseCode from "../../constants/responseCode"
import messages from "../../constants/messages"
import knex from '../../services/queryBuilder.service'
import bcrypt from 'bcrypt'

export const getUserAddress = async (req, res) => {
  try{
    const payload = req.body
    const users = await getUser(payload.userId)
    console.log(users)
    res.status(responseCode.SUCCESS).json({ status: true, data: users.response })
  }
  catch (error) {
    res.status(500).send('Error!')
  }
}

export const getUserBranch = async (req, res) => {
  try{
    const payload = req.body
    const users = await getBranch()
    console.log(users)
    res.status(responseCode.SUCCESS).json({ status: true, data: users.response })
  }
  catch (error) {
    res.status(500).send('Error!')
  }
}

export const getAllPromo = async (req, res) => {
  try{
    const users = await getPromo()
    console.log(users)
    res.status(responseCode.SUCCESS).json({ status: true, data: users.response })
  }
  catch (error) {
    res.status(500).send('Error!')
  }
}

export const getSinglePromo = async (req, res) => {
  try{
    const users = await getSinglecoupon()
    console.log(users)
    res.status(responseCode.SUCCESS).json({ status: true, data: users.response })
  }
  catch (error) {
    res.status(500).send('Error!')
  }
}



export const addUserAddress = async (req, res) => {
  try{
    const payload = userAddressValidator(req.body)
    // const users = await addUser(payload)
    console.log(payload)
    if(payload.status){
      const userAddress =  await knex('user_address').insert({
    user_id: payload.userId,
    user_address_details: payload.address_details,
    user_address_name: payload.address_name,
    user_address_landmark: payload.address_landmark,
    user_address_latitude: payload.address_latitude,
    user_address_longitude: payload.address_longitude,
    alternate_mobile: payload.alternate_mobile,
    created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      })
      console.log(userAddress)
      res.status(responseCode.SUCCESS).json({ status: true, data: userAddress })
    }else{
      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Mandatory Fields are missing" })
    }
   
  }
  catch (error) {
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
  }
}

export const deleteUserAddress = async (req, res) => {
  try{
    const {userId,address_id} = req.body

    
    const users = await knex('user_address').where({'user_id':userId ,'id':address_id}).del()
    // const payload = req.body
    // const users = await deleteUser(payload.userId)
    if (!users) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Invalid User Address" })
    res.status(responseCode.SUCCESS).json({ status: true, message: "deleted successfully" })
  }
  catch (error) {
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "" })
  }
}


export const checkCoupon = async(req,res)=>{
  try{
    const {userId,offer_coupon} = req.body
    if (!req.body.offer_coupon) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "Mandatory fields missing" })

    
    const coupon = await knex('offers').where({'offer_coupon':offer_coupon }).select("*")
    
    if (!coupon || coupon.length  === 0 ) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "No Coupon Found" })
    res.status(responseCode.SUCCESS).json({ status: true, data : coupon })
  }
  catch (error) {
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
  }
}


export const updateUsers = async (req,res)=>{
  try{
    const {userId,alt_mobile_number,mobile_number,name,email} = req.body
    
    const user = await knex('users').where({'id':userId }).update({
       'alternate_phone_number':alt_mobile_number , 'phone_number':mobile_number,
       'name' : name , 'email' : email
    })
    
    if (!user ) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "invalid User" })

    res.status(responseCode.SUCCESS).json({ status: true, message : "updated successfully" })
  }
  catch (error) {
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
  }
}


export const getDeliveryCharge = async (req,res)=>{

  try{
    const {userId,total_amount,latitude,longitude ,delivery_type} = req.body
    
    const user = await knex('orders').where({'user_id':userId }).select('delivery_charge','packing_charge','peak_charge','sgst','cgst','membership_applied',  )
    
    if (!user ) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "invalid User" })

    res.status(responseCode.SUCCESS).json({ status: true, message : "updated successfully" })
  }
  catch (error) {
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
  }

}



export const getFaq = async (req,res)=>{
  try {
        
        
    const faq = await knex('faq').select("*")
        
        if (!faq || faq.length === 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "There are No Frequently Asked Question " })
        

    res.status(responseCode.SUCCESS).json({ status: true, data: faq })
  } catch (error) {
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
  }
  
}



export const generateHash = async(req,res)=>{

  try {
    
    const {wallet_amount,variation,recipe_total_amount ,total_amount
      ,user_id,address_id,service_type,delivery_date,coupon_applied ,
      coupon_type ,
      coupon_code_id ,
      delivery_charge ,
      packing_charge ,
      tax_amount ,
      sgst ,
      cgst ,
      // peak_amount ,
    } = req.body
    
    let payment_amount = 0
    
    var order_details = []

    

    for(let i =0 ;i < variation.length; i++){

      const product = await knex('product_price')
      .where({'product_price.product_id':variation[i].product_id})
      .join('product','product.product_id',"=","product_price.product_id")
      .select('product_price.product_price','product.product_name',"product.product_id",'product.category_id')
      payment_amount += (product[0].product_price * variation[i].quantity ) 
      // console.log(product)
      
      order_details.push({product_price : product[0].product_price , product_name : product[0].product_name 
        ,product_id : product[0].product_id , category_id : product[0].category_id
        , variation_id : variation[i].variation_id , quantity : variation[i].quantity })
      
      
    }

    // if paymount amount === req.body.recipe_total_amount  
    if (recipe_total_amount == payment_amount ){

      const coupon = await knex('offer').where({"offer_id" : coupon_code_id}).select("offer_coupon","offer_percentage","minimum_ordering_amount","maximum_discount_amount")

      if(recipe_total_amount >= coupon[0].minimum_ordering_amount){
        let discounted_value = Math.round(payment_amount -  ( payment_amount * coupon[0].offer_percentage/100 ))

        if (discounted_value >  coupon[0].maximum_discount_amount){
          discounted_value = coupon[0].maximum_discount_amount
        }
        console.log(discounted_value)
        if(discounted_value == coupon_applied){
          const user_address = await knex('user_address').where({'user_id':user_id , 'user_address_id':address_id }).select("user_address_details","user_address_landmark","user_address_latitude","user_address_longitude")
      
      let generateNumber = Math.floor(10000 + Math.random() * 90000)
      let generateString = "MET" + generateNumber

        const order = await knex('orders').insert({'order_string':generateString , 'user_id' : user_id , 'address_id' : address_id , 'coupon_applied' : coupon_applied , 'coupon_type' : coupon_type,
        "delivery_charge" : delivery_charge , "packing_charge" : packing_charge , "tax": tax_amount , "sgst" : sgst , "cgst" : cgst,
        "recipe_total_amount" : recipe_total_amount , "total_amount" : total_amount , "user_address" : user_address[0].user_address_details
        , "user_landmark" :user_address[0].user_address_landmark , "user_latitude" :  user_address[0].user_address_latitude , "user_longitude":user_address[0].user_address_latitude , "payment_amount"  :payment_amount

      })
      
        
        order_details.forEach(async function (arrayItem) {
          
          const order_details = await knex('order_detail').insert({'order_id':order[0] , 'product_id':arrayItem.product_id,
          'category_id' :arrayItem.category_id, 'product_name':arrayItem.product_name,
          'variation_id':arrayItem.variation_id , 'product_price':arrayItem.product_price , 'quantity' : arrayItem.quantity })
        });
        
        // if(wallet_amount) payment_amount -= parseInt(wallet_amount)
        
        const hash = await bcrypt.hash(generateString,10)
        generateString = ""

      res.status(responseCode.SUCCESS).json({ status: true,  hash })
        }else{

          res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Invalid Coupon Applied Amount" })
        }

      }else{
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Total amount was less than minimum order amount" })
      }
        // need to check coupon id and get the coupon amount and check with body coupon applied amounnt

        
    }else{
      
      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Invalid  Amount" })
    }

    
  } catch (error) {
    console.log(error)
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
  }
}


// export const updateLocation = async (req, res) => {
//   try{
//     const payload = req.body
//     const users = await updateUserLocation(payload)
//   if(users.status)
//   {
//     res.status(responseCode.SUCCESS).json({ status: true, message: messages.LOCATION_UPDATE })
//   }
//   }
//   catch (error) {
//     res.status(500).send('Error!')
//   }
// }

//   export const updateUserDetail = async (req, res) => {

//     try{
//       const userId = req.body.userId
//       const payload = profileUpdateValidator(req.body)
//       if(payload.status)
//       {
//       const users = await updateUser(payload,userId)
//       res.status(responseCode.SUCCESS).json({ status: true, message: messages.PROFILE_UPDATE.SUCCESS })
//       }
//       else{
//         res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false,message: messages.PROFILE_UPDATE.FAILURE }) 
//       }
//     }
//     catch (error) {
//       res.status(500).json({ status: false,message: messages.SERVER_ERROR }) 
//       console.log(payload)
//     }
// }

// export const addFavourite = async (req, res) => {
//     try{
//         const payload = req.body
//         const favouriteType = req.body.favourite_type
//         const barId = req.body.bar_id

//         if(favouriteType && barId){
//             const favourites = await addFavouriteModel(payload.userId, favouriteType, barId)

//             if(favourites.status === responseCode.SUCCESS){
//                 res.status(favourites.status).json({ status: true, message: favourites.message })
//             } else{
//                 res.status(favourites.status).json({ status: false, message: favourites.message })
//             }
//         } else{
// 			res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: 'Bad Request' })
//         }
//     }
//     catch (error) {
//       res.status(500).send('Error!')
//     }
// }

// export const getFavourite = async(req, res) => {
// 	try {
// 		const userId = req.body.userId
// 		const languageId = req.body.language_id
// 		const payload = latLongValidator(req.body)
// 		const { latitude, longitude } = payload
		
// 		if(payload.status){
// 			const response = await getFavouriteModel(userId, latitude, longitude)

// 			if(response.status === responseCode.SUCCESS){
// 				if(response.details.body.length){

//                     const favouriteBarArray = []

//                     const restaurantId = response.details.body.map(item => {
//                         return item.id
//                     })

//                     const happyHoursContent = await happyHours(restaurantId)

//                     const barRulesContent = await barRestaurantRules(restaurantId)

// 					const barOffersContent = await barOffers(restaurantId)

//                     for (const favBar of response.details.body){
//                         const barResId = favBar.id

//                         let happ_extended = 0
//                         let happ_enabled = 0
//                         let happy_hours_time = '';
//                         let extendedTimeTill = '';
                        
//                         if(happyHoursContent){
//                             const happyHourCheck = happyHoursContent.details.body.find( element => element.id === barResId)

//                             if(happyHourCheck){
        
//                                 var startTime = happyHourCheck.stating_time;
//                                 var endTime = happyHourCheck.end_time;

//                                 let currentDate = new Date()   
        
//                                 let startDate
//                                 let endDate
        
//                                 startDate = new Date(currentDate.getTime());
//                                 startDate.setHours(startTime.split(":")[0]);
//                                 startDate.setMinutes(startTime.split(":")[1]);
//                                 startDate.setSeconds(startTime.split(":")[2]);
        
//                                 endDate = new Date(currentDate.getTime());
//                                 endDate.setHours(endTime.split(":")[0]);
//                                 endDate.setMinutes(endTime.split(":")[1]);
//                                 endDate.setSeconds(endTime.split(":")[2]);
        
//                                 if(happyHourCheck.extended_hours){
        
//                                     var minutesToAdd = happyHourCheck.extended_hours;
//                                     var futureDate = new Date(endDate.getTime() + minutesToAdd*60000);

//                                     extendedTimeTill = format(futureDate, 'H:mm:ss');

//                                     if (startDate < currentDate && futureDate > currentDate){
//                                         happ_extended = 1
//                                         happ_enabled = 1
//                                     } else{
//                                         happ_extended = 1
//                                         happ_enabled = 0
//                                     }
//                                 } else{
//                                     if (startDate < currentDate && endDate > currentDate){
//                                         happ_enabled = 1
//                                     }
//                                 }

//                                 happy_hours_time = happyHourCheck.stating_time + ' to ' + happyHourCheck.end_time
//                             }
//                         }

//                         const barRulesArray = []
//                         if(barRulesContent){
//                             barRulesArray = barRulesContent.details.body.filter( element => element.bar_restaurant_id === barResId)
//                         }

// 						let barOffersArray = []
// 						if (barOffersContent) {
// 							barOffersContent.details.body.map(element => {
// 								if(element.bar_restaurant_id === barResId){
// 									barOffersArray.push({
// 										offer_id: element.id,
// 										offer_name: element.name,
// 										offer_image: element.image,
// 										offer_type: element.offer_type,
// 										offer_type_id: element.offer_type_id,
// 										discount: element.discount,
// 										minimum_amount: element.minimum_amount,
// 										discount_type: element.discount_type,
// 									})
// 								}
// 							})
// 						}

//                         const openHours = favBar.opening_hour + ' to ' + favBar.closing_hour

//                         const data = {
//                             bar_id: favBar.id,
//                             bar_name: languageId == 2 ? favBar.arabic_name : favBar.name,
//                             bar_image: favBar.image,
//                             banner_image: favBar.banner_image,
//                             bar_status: favBar.status,
//                             latitude: favBar.latitude,
//                             longitude: favBar.longitude,
//                             peak_hour: favBar.peak_hour,
//                             description: favBar.description,
//                             about: languageId == 2 ? favBar.arabic_about : favBar.about,
//                             open_hours: openHours,
//                             extended_hrs_time: extendedTimeTill,
//                             happy_hours_extended: happ_extended,
//                             happy_hours_enabled: happ_enabled,
//                             happy_hours: happy_hours_time,
// 							bar_offers: barOffersArray,
// 							is_partner: favBar.slug,
//                             bar_service_id: favBar.bar_service_id,
//                             bar_rules: barRulesArray
//                         }

//                         favouriteBarArray.push(data)
//                     }

//                     res.status(responseCode.SUCCESS).json({ data: favouriteBarArray, status: true})
//                 } else{
//                     res.status(responseCode.FAILURE.DATA_NOT_FOUND).json({ status: false, message: 'No favourites found' })
//                 }
// 			} else{
// 				res.status(response.status).json({ status: false, message: response.message })
// 			}
// 		} else{
// 			res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
// 		}
// 	} catch (error) {
// 		res.status(500).send('Error!')
// 	}
// }

// export const updateLanguage = async (req, res) => {
//   try{
//     if(req.body.language_id)
//     {
//     const users = await updateUserLanguage(req.body.language_id,req.body.userId)
//     res.status(responseCode.SUCCESS).json({ status: true, message: messages.LANGUAGE_UPDATE })
//     }
//     else{
//       res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false,message: messages.MANDATORY_ERROR }) 
//     }
//   }
//   catch (error) {
//     res.status(500).json({ status: false,message: messages.SERVER_ERROR }) 
//   }
// }

// export const getPaymentMode = async (req, res) => {
// 	try{
// 		const barId = req.body.bar_id
// 		const languageId = req.body.language_id
// 		if(barId){
// 			const paymentMode = await getBarPaymentMode(barId)

// 			if(paymentMode.status === responseCode.SUCCESS){
// 				if(paymentMode.details.body.length){
// 					const paymentArray = []

// 					for( const modes of paymentMode.details.body){
// 						paymentArray.push({
// 							payment_method_id: modes.id,
// 							payment_method_name: modes.gatewayname,
// 							payment_method_image: modes.image,
// 							payment_method_description: modes.instructions
// 						})
// 					}

// 					res.status(paymentMode.status).json({ data: paymentArray, status: true })
// 				} else{
// 					res.status(responseCode.FAILURE.DATA_NOT_FOUND).json({ status: false, message: "No payment method found" })
// 				}
// 			} else{
// 				res.status(paymentMode.status).json({ status: false, message: paymentMode.message })
// 			}
// 		} else{
// 			res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: 'Bad Request' })
// 		}
//   	}
// 	catch (error) {
// 		res.status(500).send('Error!')
// 	}
// }

// export const goingRequest = async (req, res) => {
// 	try {
// 		const userId = req.body.userId
// 		const barId = req.body.bar_id
// 		const goingStatus = req.body.status

// 		if(barId && goingStatus){
// 			const response = await userGoingRequest(userId, barId, goingStatus)

// 			if(response.status === responseCode.SUCCESS) {
// 				res.status(responseCode.SUCCESS).json({ status: true})
// 			} else{
// 				res.status(response.status).json({ status: false, message: response.message })
// 			}
// 		} else{
// 			res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Bad Request" })
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		res.status(500).send('Error!')
// 	}
// }