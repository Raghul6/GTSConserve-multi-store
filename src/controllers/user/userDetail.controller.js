import express from 'express';
import responseCode from '../../constants/responseCode';
import messages from '../../constants/messages';
import { addUser } from '../../models/user/user.model'
import { userAddressValidator } from '../../services/validator.service';
import knex from '../../services/db.service'

import { delete_user_address, edit_address, get_address, get_user } from "../../models/user/userdetails.model"


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




export const getAddress = async (req,res) => {
  try{
      const address = await get_address()
      res.status(200).json({status:true,data:address.body})
  }
  catch(error){
      console.log(error)
      res.status(500).json({status:false})
  }
}

export const editAddress = async (req,res) => {

  try{
    const {user_id,title,address,landmark,type} = req.body
   
    const addresses = await edit_address(user_id,title,address,landmark,type)
    
    if (!user_id ) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "invalid User" })  
    
    res.status(responseCode.SUCCESS).json({ status: true, message : "updated successfully" })
  }
  catch (error) {
      console.log(error)
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error })
  }
}

export const getUser = async (req,res) => {
  try {
    const id = req.body; 
    const user = await get_user(id);
    res.status(responseCode.SUCCESS).json({status:true,data:user.body})
  }
  catch(error){
    console.log(error)
    res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR).json({status:false,message:"no user"})
  }
}

export const updateUser = async (req, res) => {
  try {
      if (!req.body) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: messageCode.MANDATORY_ERROR })

      const userId = parseJwtPayload(req.headers.authorization)


      const { name,email,image } = req.body


      if (!name) {

          return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Name is missing" })
      }
      if (!email) {

          return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Email is missing" })
      }
      // if (!gender) {

      //     return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Gender is missing" })
      // }

      if (req.file) {
          const image_path = "http://" + req.headers.host + "/" + req.file.destination + req.file.filename
          if (image_path) {

              const user = await User.findByIdAndUpdate(userId.user_id, {
                  image: image_path
              }, { new: true })
          }
      }



      const user = await User.findByIdAndUpdate(userId.user_id, {
           name,email
      }, { new: true })


      return res.status(responseCode.SUCCESS).json({ status: true, message: "User Profile Updated" })

  } catch (error) {
      if (error.name === 'CastError') return res.status(responseCode.FAILURE.INVALID).json({ status: false, message: "Invalid user id" })

      return res.status(responseCode.FAILURE.INTERNAL_SERVER_ERROR).json({ status: false, message: messageCode.SERVER_ERROR })
      // console.log(error)
  }
}


export const deleteUseraddress = async (req,res) => {
  try{ 
    const user_id = req.body
    const del_user = await delete_user_address(user_id)
    res.status(responseCode.SUCCESS).json({ status: true, message : "deleted successfully" })
  }
  catch (error) {
      console.log(error)
    res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, error })
  }
}