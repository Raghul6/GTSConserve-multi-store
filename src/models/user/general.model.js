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
      console.log
      return { status: true, data: get}
    } catch (error) {
      return { status: false}
    }
  }



  export const add_feedback = async (user_id,comment,feedback) =>{
    try{
      // console.log(user_id,comment,feedback)
      let feedback1 = [];
      for(let i=0;i<feedback.length;i++){
        // console.log(user_id,comment,feedback)
      const feedback3 = await knex('feedbacks').insert({
        message_id:feedback[i].id,
        user_id:user_id,
        comments:comment,
        
      })
      // console.log(feedback3)
      }
        return { status: responseCode.SUCCESS}
      } 
      catch (error) {
        return { status: false}
      }
    }
  

  