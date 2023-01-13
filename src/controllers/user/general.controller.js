import { add_feedback, get_AppSettings, get_feedback } from '../../models/user/general.model';

    export const getAppSetting = async (req, res) => {
      try{

        const settings = await get_AppSettings()

        let appSettingData = {}
        for (const settingData of settings.body){
            appSettingData[settingData.key] = settingData.value;
            
        }
        res.status(200).json({ status: true,data: appSettingData }) 
       
        // res.status(200).json({ status: true,data: settings.body }) 
      }
      catch (error) {
        console.log(error);
        res.status(500).json({ status: false,error }) 
      }
      }

      export const addFeedback = async (req,res) => {
        
        try{
                  
          const {user_id,comment,feedback} = req.body;

          const feedback2 = await add_feedback (user_id,comment,feedback)
         
            res.status(200).json({ status: true,message:"successs" })
          
        }
        catch(error){
          res.status(500).json({ status: false,error }) 
        }
      }

      export const getFeedBack = async (req, res) => {
        try{
          const userId = req.body
          const get_message = await get_feedback(userId);
  
          res.status(200).json({data:get_message.data,status:true,message:"ok" }) 
           
        }
        catch (error) {
          console.log(error);
          res.status(500).json({ status: false,error }) 
        }
        }