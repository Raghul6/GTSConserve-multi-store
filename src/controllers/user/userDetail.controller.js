import express from 'express';
import responseCode from '../../constants/responseCode';
import messages from '../../constants/messages';
import {addUser} from '../../models/user/user.model'
import { userAddressValidator } from '../../services/validator.service';


export const addUserAddress = async (req, res) => {
    try{
    //   console.log(req.body)
      const payload = userAddressValidator(req.body)
  
    //   console.log(payload)
  
      const users = await addUser(payload.user_id)
  
      console.log(users)
      if(payload){
  
    const userAddress =  await knex('user_address').insert({
          
      user_id: payload.user_id,
      address_details: payload.address,
      address_landmark: payload.landmark,
      address_title: payload.title,
      address_status: payload.status,
      //   address_name: payload.address_name,
    //   address_latitude: payload.address_latitude,
    //   address_longitude: payload.address_longitude,
    //   alternate_mobile: payload.alternate_mobile,
      created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        })
  
        console.log(userAddress)
        
        res.status(responseCode.SUCCESS).json({ status: true, data: userAddress })
      }else{
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Mandatory Fields are missing" })
      }
     
    }
    catch (error) {
        console.log(error)
      res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }
  }