
// import { response } from "express"
import responseCode from "../../constants/responseCode"
// import { userGroup } from "../../constants/controls"
import knex from "../../services/db.service"


export const get_cities = async (req,res)=>{
        const getcities = await knex.select('id','name','code','zone_id','country_id','status').from('cities')
               console.log(getcities )
        
    try{
        
        return{status:responseCode.SUCCESS,body:getcities }
    }
    catch{
        return{status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,message:error}
    }
}

export const get_countries = async (req,res) =>{
    const getcountries = await knex.select('id','code','name','phone_code','status').from('countries')
    try{
        return {status:responseCode.SUCCESS,body:getcountries}
    }
    catch{
        return{status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,message:error}
    }
}

export const get_zones = async (req,res) => {
    const getzones = await knex.select('id','name','code','country_id','status').from('zones')
    try{
        return {status:responseCode.SUCCESS,body:getzones}

    }
    catch{
        return{status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,message:error}
    }
}

export const get_postcodes = async (req,res) => {
    const getpostcodes = await knex.select('id','city_id','country_id','zone_id','code','status').from('postcodes')
    try{
        return {status:responseCode.SUCCESS,body:getpostcodes}

    }
    catch{
        return{status:responseCode.FAILURE.INTERNAL_SERVER_ERROR,message:error}
    }
}
