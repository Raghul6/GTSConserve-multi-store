

import { createToken } from "../../../services/jwt.service";

import { checkUser } from "../../../models/super_admin/login.module";

export const loginForm = async (req, res) => {
  let token = req.session.token;

  if (token) {
    req.flash("error", "cannot login again");
    return res.redirect("/home");
  }
  res.render("auth/login");
};

export const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "mandatore field are missing");
      return res.redirect("/super_admin/auth/login");
    }

    if (password.length < 5) {
      req.flash("error", "Password Must Be atleast 5 Characters");
      return res.redirect("/super_admin/auth/login");
    }

    const check_user = await checkUser(email, password);

    if (!check_user.status) {
      req.flash("error", check_user.message);
      return res.redirect("/super_admin/auth/login");
    }

    const payload = {
      user_id: check_user.data.id,
      group_id: check_user.data.user_group_id,
    };

    const token = createToken(payload);

    if (token.status) {
      req.session.token = token;
    }

    req.flash("error", "Successfully Login");
    return res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.redirect("/super_admin/auth/login");
  }
};
