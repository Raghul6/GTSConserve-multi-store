import { get_AppSettings } from '../../models/user/general.model';

    export const getAppSetting = async (req, res) => {
      try{

        const settings = await get_AppSettings()

        let appSettingData = {}
        for (const settingData of settings.body){
            appSettingData[settingData.key] = settingData.value;
            res.status(200).json({ status: true,data: appSettingData }) 
        }
        
       
        res.status(200).json({ status: true,data: settings.body }) 
      }
      catch (error) {
       
        res.status(500).json({ status: false,error }) 
      }
      }