import knex from "../../services/db.service";

import { createToken ,parseJwtPayload} from "../../services/jwt.service";

import { checkUser } from "../../models/super_admin/login.module";

export const updateProfile = async (req, res) => {
  try {
    let token = req.session.token;

    if (!token) {
      req.flash("error", "Need To Login First");
      return res.redirect("/auth/login");
    }

    const currentTokenPayload = parseJwtPayload(token.token);

    const admin_id = currentTokenPayload.user_id;

    const {
      first_name,
      last_name,
      mobile_number,
      alternate_mobile_number,
      alternate_email,
    } = req.body;

    if (!first_name) {
      req.flash("error", "First Name is Missing");
      return res.redirect("/auth/get_profile");
    }
    if (!last_name) {
      req.flash("error", "Last Name is Missing");
      return res.redirect("/auth/get_profile");
    }
    if (!mobile_number) {
      req.flash("error", "Mobile Number is Missing");
      return res.redirect("/auth/get_profile");
    }

    let update_user = {
      first_name,
      last_name,
      mobile_number,
    };

    if (alternate_mobile_number) {
      update_user.alternate_mobile_number = alternate_mobile_number;
    }
    if (alternate_email) {
      update_user.alternate_email = alternate_email;
    }

    if (req.file) {
      const image = req.file.destination.slice(1) + "/" + req.file.filename;
      update_user.profile_photo_path = image;
    }


    await knex("admin_users").update(update_user).where({ id: admin_id });

    req.flash("success", " Updated Successfully");
    res.redirect("/auth/get_profile");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const getProfile = async (req, res) => {
  try {
    const { admin_id } = req.body;

    const admin = await knex("admin_users")
      .select(
        "first_name",
        "last_name",
        "mobile_number",
        "alternate_mobile_number",
        "alternate_email",
        "profile_photo_path"
      )
      .where({ id: admin_id });

    if (admin[0].profile_photo_path) {
      admin[0].profile_photo_path =
        "http://" + req.headers.host + admin[0].profile_photo_path;
    }

    res.render("auth/profile", { user: admin[0] });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const logoutHandler = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    res.redirect("/auth/login");
  }
};

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
      return res.redirect("/auth/login");
    }

    if (password.length < 5) {
      req.flash("error", "Password Must Be atleast 5 Characters");
      return res.redirect("/auth/login");
    }

    const check_user = await checkUser(email, password);

    if (!check_user.status) {
      req.flash("error", check_user.message);
      return res.redirect("/auth/login");
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
    res.redirect("/auth/login");
  }
};
