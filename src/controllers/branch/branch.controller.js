import responseCode from "../../constants/responseCode"
import messageCode from "../../constants/messages"
import knex from "../../services/queryBuilder.service"

import { latLongValidator, getKM } from "../../services/validator.service"

export const checkBranch = async (req, res) => {
    const payload = latLongValidator(req.body)

    const { latitude, longitude } = payload

    if (payload.status) {
        // const query  = await knex.raw(`SELECT branch.*,  ( 3959 * acos( ( cos( radians(${latitude}) ) * cos( radians( branch.branch_latitude ) ) * cos( radians( branch.branch_longitude ) - radians(${longitude}) ) ) + ( sin( radians(${latitude}) ) * sin( radians( branch.branch_latitude ) ) ) ) ) * 1.609344 AS distance FROM branch HAVING distance <= 0.005 ORDER BY distance ASC`).toString()
        const branches = await knex('branchs').select('*')
        let nearBranch

        const userLocation = { lat: latitude, long: longitude }

        for (let i = 0; i < branches.length; i++) {

            let branchLocation = {
                lat: branches[i].branch_latitude,
                long: branches[i].branch_longitude
            }

            const km = getKM(userLocation, branchLocation)

            if (km <= 5) {
                nearBranch = branches[i]

            }

            if (!nearBranch) {
                return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "No branch available" })
            }

        }

        res.status(responseCode.SUCCESS).json({ status: true, data: nearBranch })
    } else {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: payload.message })
    }

}


export const getBranch = async (req, res) => {
    try {
        const branches = await knex('branchs').select('*')

        res.status(responseCode.SUCCESS).json({ status: true, data: branches })
    }
    catch (error) {
        res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "ERRROR" })
    }
}