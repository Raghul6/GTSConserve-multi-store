// import mysqlRequest from "../requests/mysqlRequest.request";
// import queryBuilder from "../services/queryBuilder.service";
// import responseCode from "../constants/responseCode";

// //Single Bar
// export const singleBar = async (barId) => {
//     let barRestaurantTable = queryBuilder.select('bar_restaurants.*', 'bar_tie_up.slug').from('bar_restaurants').join('bar_tie_up', {'bar_restaurants.bar_tie_up_id' : 'bar_tie_up.id'})
//     .where({
//         'bar_restaurants.status': '1',
//         'bar_restaurants.id': barId
//     }).toString()

//     try {
//         const response = await mysqlRequest(barRestaurantTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         } else{
//             return { status: responseCode.FAILURE.DATA_NOT_FOUND, message: 'No single bar found' }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
//     }
// }

// //Bar Menu Top Brand
// export const barMenuTopBrands = async(barId) => {
//     let barBrandsTable = queryBuilder.select('bar_brands.brand_id', 'bar_brands.arrangements', 'bar_brands.status', 'brands.name', 'brands.image').from('bar_brands').join('brands', { 'bar_brands.brand_id' : 'brands.id' })
//     .where({
//         'bar_brands.bar_restaurant_id': barId,
//         'bar_brands.is_top_brands': '1'
//     })
//     .orderBy('arrangements', 'asc').toString()

//     try {
//         const response = await mysqlRequest(barBrandsTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body}
//     }
// }

// //Bar Menu Category
// export const barMenuCategory = async(barId, isLiquor) => {
//     let barSubcategoryTable = queryBuilder.select('bar_product_category.category_id', 'bar_product_category.arrangements', 'bar_product_category.status', 'categories.name', 'categories.arabic_name', 'categories.image').from('bar_product_category').join('categories', { 'bar_product_category.category_id' : 'categories.id' })
//     .where({
//         'bar_product_category.bar_restaurant_id': barId,
//         'bar_product_category.status': '1',
//         'categories.is_liquor': `${isLiquor}`
//     })
//     .orderBy('arrangements', 'asc').toString()
// console.log(barSubcategoryTable)
//     try {
//         const response = await mysqlRequest(barSubcategoryTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body}
//     }
// }

// //Bar Menu Product
// export const barMenuProduct = async(barId, barCatId) => {
//     let productTable = queryBuilder.select('*').from('products').where({
//         bar_restaurant_id: barId,
//         category_id: barCatId,
//         status: '1'
//     }).toString()

//     try {
//         const response = await mysqlRequest(productTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body}
//     }
// }

// //Bar Menu Product Variation
// export const barMenuProductVariation = async(productIds) => {
//     let productVariationTable = queryBuilder.select('product_variations.product_id', `product_variations.id AS product_price_id`, `product_variations.value AS variation`, 'product_variations.price', `variation_types.value AS unit`).from('product_variations')
//     .join('products', {'product_variations.product_id' : 'products.id'})
//     .join('variation_types', {'variation_types.id' : 'product_variations.variation_type_id'})
//     .whereIn('product_variations.product_id', productIds)
//     .toString()

//     try {
//         const response = await mysqlRequest(productVariationTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body}
//     }
// }

// //Order Coupon Check
// export const orderCouponCheck = async(userId, couponCode) => {
//     let orderTable = queryBuilder.select('*').from('orders')
//     .where({
//         user_id: userId,
//         coupon_code: couponCode,
//         status: '6'
//     }).toString()

//     try {
//         const response = await mysqlRequest(orderTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
//     }
// }

// //Coupon Code
// export const couponCode = async(barId) => {
//     let barCouponTable = queryBuilder.select('*').from('bar_coupons').where({
//         bar_restaurant_id: barId,
//         status: '1'
//     }).toString()

//     try {
//         const response = await mysqlRequest(barCouponTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
//     }
// }

// //Coupon Code
// export const singleCouponCode = async(barId, couponCode) => {
//     let barCouponTable = queryBuilder.select('*').from('bar_coupons').where({
//         bar_restaurant_id: barId,
//         coupon_code: couponCode,
//         status: '1'
//     }).toString()

//     try {
//         const response = await mysqlRequest(barCouponTable)

//         if(response.status){
//             return { status: responseCode.SUCCESS, details: response }
//         }
//     } catch (error) {
//         return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.body }
//     }
// }