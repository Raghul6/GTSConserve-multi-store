import { allOrders, singleOrder, rateOrder } from "../../models/order.model"
import responseCode from "../../constants/responseCode"
import messageCode from "../../constants/messages"
import logger from "../../logger/logger"
import format from "date-fns/format"
import { latLongValidator } from "../../services/validator.service"
import knex from "../../services/queryBuilder.service"

export const trackOrder = async (req, res) => {
    const { userId, order_id } = req.body


    try {
        const order = await knex('orders')
            .where({ 'orders.order_id': order_id, 'orders.user_id': userId })
            .join('branch', 'branch.branch_id', "=", "orders.address_id")
            .join('user' , 'orders.user_id', "=" , "user.user_id")
            .join('delivery_partner','delivery_partner.delivery_partner_id','=','orders.delivery_partner_id')
            .select('orders.order_status', 'branch.branch_name', 'branch.branch_latitude', 'branch.branch_longitude',
            'user.user_name','user.user_phone_number','user.latitude','user.longitude',
            'delivery_partner.delivery_partner_id','delivery_partner.delivery_partner_name','delivery_partner.delivery_partner_phone',
            'delivery_partner.delivery_partner_image','delivery_partner.delivery_partner_latitude','delivery_partner.delivery_partner_longitude'
            )
        res.status(responseCode.SUCCESS).json({ status: true, data: order })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }
}

// All Order Api
export const getAllOrders = async (req, res) => {
    try{
      const payload = req.body
      const users = await allOrders(payload.id)
      console.log(users)
      res.status(responseCode.SUCCESS).json({ status: true, data: users.response })
    }
    catch (error) {
      res.status(500).send('Error!')
    }
  }

//Single Order

export const getSingleOrder = async (req, res) => {
    try{
      const payload = req.body

      const users = await singleOrder(req.body.id, req.body.order_id)
      console.log(users)
      res.status(responseCode.SUCCESS).json({ status: true, data: users })
    }
    catch (error) {
      res.status(500).send(error)
    }
  }


//Order Rating
export const orderRating = async(req, res) => {
    const user_id = req.body.user_id
    const order_id = req.body.order_id
    const rating = req.body.rating
    const comment = req.body.comment

    try {
        if(order_id && rating){
            const response = await rateOrder(user_id, order_id, rating, comment)
    
            if(response.status === responseCode.SUCCESS){
                res.status(responseCode.SUCCESS).json({ status: true, message: "ok" })
            } else{
                res.status(response.status).json({ status: false, message: response.message })
            }
        } else{
            res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "order rating request failed" })
        }
    } catch (error) {
        logger.error('Whooops! This broke with error: ', error)
        res.status(500).send('Error!')
    }
}

export const checkGenerateOrders = async(req, res) => {
      const product_id = req.body;
  try {   
          const response = await generateOrder(product_id)
          
        //   const billAmount = []

        
        // for (let i =0 ; i< generateOrder.length ; i++){
        //   billAmount.push({})
        // }
  
          if(response.status === responseCode.SUCCESS){
              res.status(responseCode.SUCCESS).json({data:response, status: true, message: "ok"})
          } else{
              res.status(response.status).json({ status: false, message: response.message })
          }
      
  } catch (error) {
      logger.error('Whooops! This broke with error: ', error)
      res.status(500).send('Error!')
  }
}