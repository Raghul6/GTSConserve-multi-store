
import {  get_cities, get_countries, get_postcodes, get_zones,get_subscription_products, get_all_categories, get_all_products} from '../../models/user/user.model';


export const cities = async (req, res) => {
    try{

      const city = await get_cities()
      res.status(200).json({status:true,DATA:city.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ status: false }) 
      }

      }

export const countries = async (req,res) => {
    try{
        const country = await get_countries()
        res.status(200).json({status:true,DATA:country.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ status: false }) 
      }

}

export const zones = async (req,res) => {
    try{
        const zone = await get_zones()
        res.status(200).json({status:true,DATA:zone.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ status: false }) 
      }

}

export const postcodes = async (req,res) => {
    try{
        const postcode = await get_postcodes()
        res.status(200).json({status:true,DATA:postcode.body})

    }
    catch(error){
        console.log(error)
        res.status(500).json({ status: false }) 
      }
}

export const subscription_products= async (req,res) =>{
    try{
        
        const {id} = req.body
        // const{id} = req.body
        const list = await get_subscription_products(id)
        res.status(200).json({status:true,DATA:list.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:false})
    }
}

export const all_categories = async (req,res) =>{
    try{
        const category = await get_all_categories()
        res.status(200).json({status:true,DATA:category.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:false})
    }
}

export const all_products = async (req,res) =>{
    try{
        const product= await get_all_products()
        res.status(200).json({status:true,DATA:product.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:false})
    }
}

// export const addUserAddress = async (req, res) => {
//     try{
//       const payload = userAddressValidator(req.body)
//       // const users = await addUser(payload)
//       console.log(payload)
//       if(payload.status){
//         const userAddress =  await knex('user_address').insert({
//       user_id: payload.userId,
//       user_address_details: payload.address_details,
//       user_address_name: payload.address_name,
//       user_address_landmark: payload.address_landmark,
//       user_address_latitude: payload.address_latitude,
//       user_address_longitude: payload.address_longitude,
//       alternate_mobile: payload.alternate_mobile,
//       created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
//         })
//         console.log(userAddress)
//         res.status(responseCode.SUCCESS).json({ status: true, data: userAddress })
//       }else{
//         res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Mandatory Fields are missing" })
//       }
     
//     }
//     catch (error) {
//       res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
//     }
//   }
  