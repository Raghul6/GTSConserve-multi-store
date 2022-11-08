import responseCode from "../../constants/responseCode";
import messages from "../../constants/messages";
import knex from "../../services/db.service";

import { checkUser } from "../../models/super_admin/login.module";

export const test = async (req, res) => {
  const user = await knex("users").select("name", "password").where({ id: 1 });

  console.log(user);

  res.render("test", { user });
};

export const form = async (req, res) => {
  res.render("form");
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password ) {
      return res
        .status(responseCode.FAILURE)
        .json({ status: false, message: messages.MANDATORY_ERROR });
      }
      
      if(password.length < 5){
      return res
        .status(responseCode.FAILURE)
        .json({ status: false, message: "Password Must Be atleast 5 Characters" });

    }

    const check_user = await checkUser(email,password);

    if (!check_user.status) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: check_user.message });
    }

   

    res.redirect("test");
  } catch (error) {
    console.log(error);
  }
};
