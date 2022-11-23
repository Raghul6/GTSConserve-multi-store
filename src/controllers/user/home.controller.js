import { get_banner } from '../../models/user/home.model';
import { } from '../../models/user/product.model';

export const getBanner= async (req,res) =>{
//     const {status} = req.body
//    const banner = await get_banner(status);
   
        try{
              
        const list = await get_banner()
        res.status(200).json({status:true,data:list.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({status:false})
    }
}

