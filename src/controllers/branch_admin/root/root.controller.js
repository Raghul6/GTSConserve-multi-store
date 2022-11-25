export const getRoot = async (req, res) => {
  try {
    res.render("branch_admin/root/apporve_purchase_order");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

// export const getGeneratePurchaseList = async (req, res) => {
//   try {

//    res.render("branch_admin/root/generate_purchase_order");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };

// export const getCancelPurchaseList = async (req, res) => {
//   try {
    
//     res.render("branch_admin/root/cancelled_purchase_order");
//   } catch (error) {
//     console.log(error);
//     res.redirect("/home");
//   }
// };