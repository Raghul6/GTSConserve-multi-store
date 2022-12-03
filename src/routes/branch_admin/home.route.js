import express  from 'express';


import { getHomePage,updateDailyTask } from '../../controllers/branch_admin/home/home.controller';

const homeRouter = express.Router({
  caseSensitive: true,
  strict: true
})

homeRouter.get('/home',getHomePage)

homeRouter.post('/update_daily_task',updateDailyTask)




export default homeRouter