  export const getApprovePurchaseList = async (req, res) => {
    try {
      res.render("branch_admin/purchaseOrder/apporve_purchase_order");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getGeneratePurchaseList = async (req, res) => {
    try {

     res.render("branch_admin/purchaseOrder/generate-purchase_order");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };

  export const getCancelPurchaseList = async (req, res) => {
    try {
      
      res.render("branch_admin/purchaseOrder/cancelled_purchase_order");
    } catch (error) {
      console.log(error);
      res.redirect("/home");
    }
  };