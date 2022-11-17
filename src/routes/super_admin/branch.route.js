import express  from 'express';
import { getBranchAdmin } from "../../controllers/super_admin/branch/branch.controller"


const branchRouter = express.Router({
  caseSensitive: true,
  strict: true
})

branchRouter.get('/get_branch_admin',getBranchAdmin)


export default branchRouter