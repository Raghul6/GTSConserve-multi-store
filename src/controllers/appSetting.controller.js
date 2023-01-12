import responseCode from "../constants/responseCode"
import messages from "../constants/messages"
import { getAppSettings } from "../models/appSetting.model"
import knex from "../services/queryBuilder.service"

export const appSetting = async (req, res) => {
  try{

    const settings = await getAppSettings()
    let appSettingData = {}
    for (const settingData of settings.body){
        appSettingData[settingData.key] = settingData.value;
    }
    res.status(200).json({ status: true,data: appSettingData }) 
  }
  catch (error) {
   
    res.status(500).json({ status: false,message: messages.SERVER_ERROR }) 
  }
  }

    // export const appSetting = async (req, res) => {
    //   try{

    //     const settings = await knex('app_controls').select('*')
    //     // let appSettingData = {}
    //     // for (const settingData of settings.body){
    //     //     appSettingData[settingData.key] = settingData.value;
    //     // }
    //     res.status(200).json({ status: true,data: settings }) 
    //   }
    //   catch (error) {
       
    //     res.status(500).json({ status: false,message: error.sqlMessage }) 
    //   }
    //   }
