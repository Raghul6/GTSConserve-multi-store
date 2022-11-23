import express from 'express';
import responseCode from '../../constants/responseCode';
import messages from '../../constants/messages';
import { addUser } from '../../models/user/user.model'
import { userAddressValidator } from '../../services/validator.service';
import knex from '../../services/db.service'



export const addUserAddress = async (req, res) => {
  try {

    const payload = userAddressValidator(req.body)
   

    if(payload){

    const userAddress =  await knex('user_address').insert({
        
    user_id: payload.user_id,
    address_details: payload.address_details,
    address_name: payload.address_name,
    address_landmark: payload.address_landmark,
    title:payload.title,
    type:payload.type,
    created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
      })

      // console.log(userAddress)
      
      res.status(responseCode.SUCCESS).json({ status: true, data: userAddress })
    }
    //   else {
    //     res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Mandatory Fields are missing" })
    //   }

  }
  catch (error) {
    console.log(error)
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
  }
}