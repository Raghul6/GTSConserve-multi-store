import express  from 'express';
import { getBranchAdmin,createBranchAdmin,updateBranchStatus,updateBranch } from "../../controllers/super_admin/branch/branch.controller"


const branchRouter = express.Router({
  caseSensitive: true,
  strict: true
})

branchRouter.get('/get_branch_admin',getBranchAdmin)
branchRouter.post('/create_branch_admin',createBranchAdmin)
branchRouter.post('/update_branch',updateBranch)
branchRouter.post('/update_branch_status',updateBranchStatus)


export default branchRouter