import express  from 'express';
import { getNearByBuddy,buddyRequest,updateBuddyRequest,buddyList,blockBuddy } from "../../controllers/user/buddy.controller"
import { addBuddyGroup,addBuddyMember,getBuddyGroup,groupRename,memberRemove,groupRemove } from "../../controllers/group/group.controller"
import { authenticateJWT } from '../../middlewares/authToken.middleware'; 
const userRouter = express.Router({
  caseSensitive: true,
  strict: true
})
 userRouter.post('/near_by_buddy',authenticateJWT,getNearByBuddy)
 userRouter.post('/buddy_request',authenticateJWT,buddyRequest)
 userRouter.post('/update_buddy_request',authenticateJWT,updateBuddyRequest)
 userRouter.get('/buddy_list',authenticateJWT,buddyList)
 userRouter.post('/buddy_block',authenticateJWT,blockBuddy)
 userRouter.post('/add_buddy_group',authenticateJWT,addBuddyGroup)
 userRouter.post('/add_group_member',authenticateJWT,addBuddyMember)
 userRouter.get('/get_buddy_group',authenticateJWT,getBuddyGroup)
 userRouter.post('/buddy_group_rename',authenticateJWT,groupRename)
 userRouter.post('/group_member_remove',authenticateJWT,memberRemove)
 userRouter.post('/group_remove',authenticateJWT,groupRemove)

export default userRouter