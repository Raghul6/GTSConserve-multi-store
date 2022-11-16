export const getApprovePurchaseList = async (req, res) => {
  try {
    res.render("branch_admin/ride/apporve_purchase_order");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getGeneratePurchaseList = async (req, res) => {
  try {

   res.render("branch_admin/ride/generate-purchase_order");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getCancelPurchaseList = async (req, res) => {
  try {
    
    res.render("branch_admin/ride/cancelled_purchase_order");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};