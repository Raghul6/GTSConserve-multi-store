import responseCode from "../../constants/responseCode";

import knex from "../../services/db.service";

export const get_AppSettings = async () => {
    const appSetting= await knex.select('key','value').from('app_settings')
    
    try {
    return { status: responseCode.SUCCESS, body: appSetting }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, error}
    }
  }


  export const get_feedback = async (userId) => {
    try {
      const get = await knex('feedback_message').select('id','message as name')
      return { status: responseCode.SUCCESS, data: get.data }
    } catch (error) {
      return { status: false}
    }
  }



  export const add_feedback = async (user_id,comment,feed_back) =>{
    try{
      let feedback = [];
      for(let i=0;i<feed_back.length;i++){
      feedback = await knex('feedback_message').inert({
        user_id:user_id,
        comment:comment,
        message_id:feed_back[i].id
      })
      }
        return { status: responseCode.SUCCESS}
      } 
      catch (error) {
        return { status: false}
      }
    }
  

  