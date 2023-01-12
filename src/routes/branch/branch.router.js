import express from "express"
import { nonMandatoryToken, authenticateJWT } from "../../middlewares/authToken.middleware"

import { checkBranch,getBranch } from "../../controllers/branch/branch.controller"

const branchRouter = express.Router({
    caseSensitive: true,
    strict: true
})

branchRouter.get('/get_branch',getBranch)
branchRouter.get('/check_branch',checkBranch)


export default branchRouter