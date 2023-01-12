import responseCode from "../constants/responseCode"
import mysqlRequest from "../requests/mysqlRequest.request"
import queryBuilder from "../services/queryBuilder.service"

// All Orders
// export const allOrders = async(userId) => {
//     let ordersTable = queryBuilder.raw(`SELECT orders.id, orders.order_no, orders.status, orders.total_amount, orders.order_date, bar_restaurants.name, bar_restaurants.arabic_name, payment_gateways.gatewayname FROM orders JOIN bar_restaurants ON orders.bar_restaurant_id = bar_restaurants.id JOIN payment_gateways ON orders.payment_method_id = payment_gateways.id WHERE orders.user_id = ?`, [userId]).toString()

//     try {
//         const response = await mysqlRequest(ordersTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
//     }
// }

// // Single Order
// export const singleOrder = async(userId, orderId) => {
//     let ordersTable = queryBuilder.raw(`SELECT orders.id, orders.order_no, orders.order_date, orders.status AS order_status, order_status.display_name AS order_status_name, orders.bar_waiter_detail_id AS order_waiter_id, bar_waiter_details.name AS waiter_name, orders.bar_restaurant_id, bar_restaurants.name AS bar_name, bar_restaurants.arabic_name AS bar_arabic_name, orders.payment_method_id, payment_gateways.gatewayname AS payment_method_name, order_item.product_id, products.name AS product_name, products.image AS product_image, products.arabic_name AS product_arabic_name, order_item.product_variation_id, product_variations.value AS product_variation_name , product_variations.variation_type_id, variation_types.value AS product_variation_type, product_variations.price AS product_variation_price, order_item.price AS order_item_price, order_item.quantity, order_item.total_amount AS product_total, order_item.producttaxrate, orders.sub_total, order_item.status AS order_item_status, order_transactions.total_amount, order_transactions.coupon_discount_amount, order_transactions.offer_discount_amount, order_transactions.redeem_points, order_transactions.redeem_points_amount, order_transactions.reward_points FROM orders JOIN order_item ON orders.id = order_item.order_id LEFT JOIN order_transactions ON order_transactions.order_no = orders.order_no LEFT JOIN payment_gateways ON orders.payment_method_id = payment_gateways.id LEFT JOIN bar_waiter_details ON orders.bar_waiter_detail_id = bar_waiter_details.id LEFT JOIN order_status ON orders.status = order_status.id LEFT JOIN products ON order_item.product_id = products.id LEFT JOIN product_variations ON product_variations.id = order_item.product_variation_id LEFT JOIN variation_types ON variation_types.id = product_variations.variation_type_id LEFT JOIN bar_restaurants ON orders.bar_restaurant_id = bar_restaurants.id WHERE orders.user_id = ? AND orders.id = ?`, [userId, orderId]).toString()

//     console.log(ordersTable);
//     try {
//         const response = await mysqlRequest(ordersTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
//     }
// }

// //Order Rating
// export const rateOrder = async(userId, orderId, orderNo, rating, comments) => {
//     let orderRatingTable = queryBuilder.insert({
//         user_id: userId,
//         order_id: orderId,
//         order_no: orderNo,
//         rating: rating,
//         comments: comments,
//     }).into("order_ratings").toString()

//     try {
//         const response = await mysqlRequest(orderRatingTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS}
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
//     }
// }

// All Orders
export const allOrders = async (id) => {

    let ordersTable = await knex('orders').select('order_id', 'order_string', 'delivery_date', 'booking_date', 'booking_time', 'total_amount ', 'order_status', 'payment_type', 'message', 'rating', 'service_type').where({ "id": id })
    try {
        return { status: responseCode.SUCCESS, response: ordersTable }
    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
    }
}

// Single Order
export const singleOrder = async (id, order_id) => {
    let ordersTable = await knex('orders').where({ 'orders.id': id, 'orders.order_id': order_id })
        .join("delivery_partners", "orders.delivery_partner_id", "=", "delivery_partners.id")
        .join("products", "orders.id", "=", "products.category_id")
        .select('orders.order_id', 'products.product_name', "order_string", 'booking_date', 'booking_time', 'total_amount', 'order_status', 'payment_type',
            'recipe_total_amount', 'coupon_applied', 'packing_charge', 'payment_amount', 'delivery_charge', 'coupon_code', 'service_type', 'wallet_amount',
            'tax', 'message', 'delivery_charge', 'delivery_partner_distance', 'category_id', 'product_name', 'product_image1', 'product_price',
            'eggless', 'user_address', 'user_landmark', 'delivery_partners.delivery_partner_name', 'delivery_partner_phone', 'delivery_partner_image')
    try {
        return { status: responseCode.SUCCESS, data: ordersTable }
    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.sqlMessage }
    }
}

//Order Rating
export const rateOrder = async (rating, comment) => {
    let orderRating = await knex('orders')
        .update({

            "rating": rating,
            "comment": comment
        },
        )

    try {
        return { status: responseCode.SUCCESS, data: orderRating }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
    }
}

export const generateOrder = async (product_id) => {
    let orderRating = await knex('order_details')
    .join('orders')
    .select('product_id', 'variation_id','product_price','quantity','total_amount','recipe_total_amount','coupon_code','delivery_charge')
    

    try {
        return { status: responseCode.SUCCESS, data: orderRating }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
    }
}

export const useCouponCode = async () => {
    let orderRating = await knex('orders')
    .where('coupon_code', '=', 6758)
    .decrement({
        total_amount: 50,
    })

    try {
        return { status: responseCode.SUCCESS, data: orderRating }

    } catch (error) {
        return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
    }
}