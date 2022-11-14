
import {  get_cities, get_countries, get_postcodes, get_zones } from '../../models/user/user.model';


export const cities = async (req, res) => {
    try{

      const city = await get_cities()
      res.status(200).json({status:true,DATA:city.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ status: false }) 
      }

      }

export const countries = async (req,res) => {
    try{
        const country = await get_countries()
        res.status(200).json({status:true,DATA:country.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ status: false }) 
      }

}

export const zones = async (req,res) => {
    try{
        const zone = await get_zones()
        res.status(200).json({status:true,DATA:zone.body})
    }
    catch(error){
        console.log(error)
        res.status(500).json({ status: false }) 
      }

}

export const postcodes = async (req,res) => {
    try{
        const postcode = await get_postcodes()
        res.status(200).json({status:true,DATA:postcode.body})

    }
    catch(error){
        console.log(error)
        res.status(500).json({ status: false }) 
      }
}
