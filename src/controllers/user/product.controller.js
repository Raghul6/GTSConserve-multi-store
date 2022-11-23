import responseCode from "../../constants/responseCode";
import messages from "../../constants/messages";
import {
  get_products,
  get_categories,
  get_subscription_or_add_on_products,
  search_products,
} from "../../models/user/product.model";






export const getProducts= async (req,res) =>{
    try{
        
        const {id} = req.body
    
        const list = await get_products(id)
        res.status(200).json({status:true,DATA:list.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:false})
    }
}

export const getCategories = async (req,res) =>{
    try{
        const category = await get_categories()
        res.status(200).json({status:true,DATA:category.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:false})
    }
}

// export const getProducts = async (req,res) =>{
//     try{
//         const product= await get_all_products()
//         res.status(200).json({status:true,DATA:product.body})
//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json({status:false})
//     }
// }

    const product = await search_products(
      product_type_id,
      search_keyword,
      userId
    );
    if (!product.status) {
      return res
        .status(responseCode.FAILURE.DATA_NOT_FOUND)
        .json({ status: false, message: product.message });
    }

    return res.status(responseCode.SUCCESS).json({
      status: true,
      data: product.data,
    });
  

