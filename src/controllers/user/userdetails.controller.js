import {add_address, delete_user, delete_user_address, edit_address, get_address, get_user, update_user } from "../../models/user/userdetails.model"
import responseCode from "../../constants/responseCode"
// import knex from '../../services/db.service'


export const addAddress= async (req, res) => {
    try {
    //   const id = req.body.id;
      const title = req.body
      const user_id = req.body;
      const address = req.body;
      const landmark = req.body;
      const type = req.body;
  
      const addaddress = await add_address(title,user_id,address,landmark,type)
            // console.log("hi");

            res.status(200).json({status:true})
            // console.log("hi");
  
    } catch (error) {
      res.status(500).send("Error!");
    }
  };

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