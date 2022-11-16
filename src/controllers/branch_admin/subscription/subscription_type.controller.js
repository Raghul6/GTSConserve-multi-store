export const getUserList = async (req, res) => {
  try {
    res.render("branch_admin/subscription/user");
  } catch (error) {
    console.log(error); 
    res.redirect("/home");
  }
};

export const getSubscriptionUserList = async (req, res) => {
  try {

   res.render("branch_admin/subscription/subscription_user");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getCancelUserList = async (req, res) => {
  try {
    
    res.render("branch_admin/subscription/cancelled_user");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};