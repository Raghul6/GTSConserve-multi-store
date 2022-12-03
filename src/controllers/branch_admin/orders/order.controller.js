import knex from "../../../services/db.service"


export const getDailyOrders = async (req,res) => {
    try {
        console.log("hititinf")
        console.log(req.query)

        res.render("branch_admin/order/order")
    } catch (error) {
        console.log(error)
        return res.redirect("/home")
    }
}