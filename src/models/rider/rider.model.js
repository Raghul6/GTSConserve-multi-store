import knex from 'knex';

export const userLogin = async (password) => {

    const checkPassword = await knex.select('*').from('rider_details').where({'password': password})
    
    try {
      return { status: responseCode.SUCCESS, body: checkPassword }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }
  
  export const insertUser = async (payload,otp,today) => {

    const user_query = await knex.select(['id']).from('rider_details')
  
    let user_length = user_query.body
  
    user_length += 1
  
    const generate_id = 'MARAM' + user_length
  
    const { user_name, password} = payload
    const query  = await knex.insert([{
      user_unique_id : generate_id,
      password: password,
      user_name:user_name,
      // name:name
      // user_id: userGroup.USER_GROUP_ID,
      // app_version:'1.0',
      // status:'1',
  
    }]).into('rider_details')
    try {
    return { status: responseCode.SUCCESS, body: query }
    } catch (error) {
      return { status: responseCode.FAILURE.INTERNAL_SERVER_ERROR, message: error.message }
    }
  }

  