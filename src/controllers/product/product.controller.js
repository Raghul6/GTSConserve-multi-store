import responseCode from "../../constants/responseCode"
import messageCode from "../../constants/messages"
import knex from "../../services/queryBuilder.service"


export const addFavourite = async (req, res) => {
    try {
        const { userId, product_id } = req.body

        if (!product_id || product_id == 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "Mandatory fields missing" })

        const favourite = await knex('favorite').insert({ "user_id": userId, "product_id": product_id })

        res.status(responseCode.SUCCESS).json({ status: true, message: "Successfully added" })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }


}

export const getFavourite = async (req, res) => {
    try {
        const { userId } = req.body

        // if (!product_id || product_id == 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "Mandatory fields missing" })

        const product_id = await knex('favorite').where({ "user_id": userId }).select("product_id")

        // console.log(favouriteProducts)

        let favourite_products = []

        for(let i = 0 ; i< product_id.length ; i ++){
            const products = await knex('product AS p')
            .where({ "p.product_id": product_id[i].product_id })
            .join("category AS c", "c.category_id", "=", "p.category_id")
            .join("product_price AS pp", "pp.product_id", "=", "p.product_id")
            .join("unit", "unit.unit_id", "=", "pp.unit_id")
            .select("p.product_id", "p.product_name", "c.category_name", "pp.product_demo_price", "p.product_video_link", "p.product_image1", "p.timeslot", "p.product_recommended", "p.product_percentage", "p.is_favourite", "p.product_description", "p.product_offer", "pp.netw", "pp.grossw", "p.product_rating"
                , "pp.product_id", "pp.product_variation", "pp.product_price", "pp.product_demo_price", "pp.product_weight", "pp.product_piece_count", "pp.product_serves", "unit.unit_name"
            )
            favourite_products.push(...products)
        }

       console.log(favourite_products)

        res.status(responseCode.SUCCESS).json({ status: true, message: "Successfully added" })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }


}


export const getAllProducts = async (req, res) => {
    try {


        const products = await knex('product AS p')
            .join("category AS c", "c.id", "=", "p.category_id")
            .join("product_price AS pp", "pp.product_id", "=", "p.product_id")
            .join("unit", "unit.id", "=", "pp.unit_id")
            .select("p.product_id", "p.product_name", "c.category_name", "pp.product_demo_price", "p.product_video_link", "p.product_image1", "p.timeslot", "p.product_recommended", "p.product_percentage", "p.is_favourite", "p.product_description", "p.product_offer", "pp.netw", "pp.grossw", "p.product_rating"
                , "pp.product_id", "pp.product_variation", "pp.product_price", "pp.product_demo_price", "pp.product_weight", "pp.product_piece_count", "pp.product_serves", "unit.unit_name"
            )

        // if(!product_id) res.status(responseCode.FAILURE.BAD_REQUEST).send("Mandatory fields missing")

        // const favourite = await knex('favorite').insert({"user_id":userId,"product_id":product_id})

        res.status(responseCode.SUCCESS).json({ status: true, data: products })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }


}


export const getSingleProduct = async (req, res) => {

    const { product_id } = req.body
    if (!req.body.product_id) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "Mandatory fields missing" })
    try {

        const products = await knex('product AS p').where({ "p.product_id": product_id })
            .join("category AS c", "c.id", "=", "p.category_id")
            .join("product_price AS pp", "pp.product_id", "=", "p.product_id")
            .join("unit", "unit.id", "=", "pp.unit_id")
            .select("p.product_id", "p.product_name", "c.category_name", "pp.product_demo_price", "p.product_video_link", "p.product_image1", "p.product_image2", "p.product_image3",
                "p.timeslot", "p.product_recommended", "p.product_percentage", "p.is_favourite", "p.product_description", "p.product_offer", "pp.netw", "pp.grossw", "p.product_rating"
                , "pp.product_id", "pp.product_variation", "pp.product_price", "pp.product_demo_price", "pp.product_weight", "pp.product_piece_count", "pp.product_serves", "unit.unit_name"
            )

        if (!products || products.length === 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "No product Found" })
        const product = products[0]

        // if(!product_id) res.status(responseCode.FAILURE.BAD_REQUEST).send("Mandatory fields missing")

        // const favourite = await knex('favorite').insert({"user_id":userId,"product_id":product_id})

        res.status(responseCode.SUCCESS).json({ status: true, data: product })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }



}


export const getCategoryProduct = async (req, res) => {

    const { category_id } = req.body
    if (!req.body.category_id) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "Mandatory fields missing" })


    try {


        const products = await knex('product AS p')
            .where({ "category_id": category_id })
            .join("category AS c", "c.id", "=", "p.category_id")
            .join("product_price AS pp", "pp.product_id", "=", "p.product_id")
            .join("unit", "unit.id", "=", "pp.unit_id")
            .select("p.product_id", "p.product_name", "c.category_name", "pp.product_demo_price", "p.product_video_link", "p.product_image1", "p.timeslot", "p.product_recommended", "p.product_percentage", "p.is_favourite", "p.product_description", "p.product_offer", "pp.netw", "pp.grossw", "p.product_rating"
                , "pp.product_id", "pp.product_variation", "pp.product_price", "pp.product_demo_price", "pp.product_weight", "pp.product_piece_count", "pp.product_serves", "unit.unit_name"
            )

        // if(!product_id) res.status(responseCode.FAILURE.BAD_REQUEST).send("Mandatory fields missing")
        if (!products || products.length === 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "No category  Found" })

        // const favourite = await knex('favorite').insert({"user_id":userId,"product_id":product_id})

        res.status(responseCode.SUCCESS).json({ status: true, data: products, count: false })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }



}


export const getOfferProduct = async (req, res) => {
    try {
        const products = await knex('product AS p')
            .where({ "product_offer": '1' })
            .join("category AS c", "c.id", "=", "p.category_id")
            .join("product_price AS pp", "pp.product_id", "=", "p.product_id")
            .join("unit", "unit.id", "=", "pp.unit_id")
            .select("p.product_id", "p.product_name", "c.category_name", "pp.product_demo_price", "p.product_video_link", "p.product_image1", "p.timeslot", "p.product_recommended", "p.product_percentage", "p.is_favourite", "p.product_description", "p.product_offer", "pp.netw", "pp.grossw", "p.product_rating"
                , "pp.product_id", "pp.product_variation", "pp.product_price", "pp.product_demo_price", "pp.product_weight", "pp.product_piece_count", "pp.product_serves", "unit.unit_name"
            )

        // if(!product_id) res.status(responseCode.FAILURE.BAD_REQUEST).send("Mandatory fields missing")
        if (!products || products.length === 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "No Deals Availble Today" })

        // const favourite = await knex('favorite').insert({"user_id":userId,"product_id":product_id})

        res.status(responseCode.SUCCESS).json({ status: true, data: products, count: false })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }
}


export const createProductRating = async (req, res) => {

    const { userId, order_id, products } = req.body
    if (!order_id || products.length === 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "Mandatory fields missing" })

    try {
        for (let i = 0; i < products.length; i++) {

            const productRating = await knex('product_rating').insert({ 'user_id': userId, 'order_id': order_id, 'product_id': products[i].product_id, 'rating': products[i].rating, 'comment': products[i].feedback })
        }
        // if (!productRating || productRating.length === 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "No Deals Availble Today" })
        res.status(responseCode.SUCCESS).json({ status: true, message:"Successfully Added" })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })

    }

}

export const getWalletHistory = async (req, res) => {

    try {
        const { user_id } = req.body

        if (!user_id || user_id == 0) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "Mandatory fields missing" })

        const walletHistory = await knex('wallet_historys')

        res.status(responseCode.SUCCESS).json({ data:walletHistory, status: true, message: "ok" })
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }


}

export const getMembership = async (req, res) => {

    try {
        const membership = await knex('memberships')

        res.status(responseCode.SUCCESS).json({ data:membership, status: true})
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }


}

export const getBestSelingProduct = async (req, res) => {

    try {
        const { user_id } = req.body

        if (!user_id ) return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, Message: "Mandatory fields missing" })
        
        const products = await knex('products AS p')
            .join("categories AS c", "c.id", "=", "p.category_id")
            // .join("product_prices AS pp", "pp.product_id", "=", "p.product_id")
            // .join("unit", "unit.id", "=", "pp.unit_id")
            // .select("p.product_id", "p.product_name", "c.category_name", "pp.product_demo_price", "p.product_video_link", "p.product_image1", "p.timeslot", "p.product_recommended", "p.product_percentage", "p.is_favourite", "p.product_description", "p.product_offer", "pp.netw", "pp.grossw", "p.product_rating"
            //     , "pp.product_id", "pp.product_variation", "pp.product_price", "pp.product_demo_price", "pp.product_weight", "pp.product_piece_count", "pp.product_serves", 
            // )

        res.status(responseCode.SUCCESS).json({ data: products, status: true})
    } catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: error.sqlMessage })
    }


}

