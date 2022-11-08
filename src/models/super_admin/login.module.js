import bcrypt from "bcrypt";
import knex from "../../services/db.service";

export const checkUser = async (email, password) => {
  try {
    const get_user = await knex("admin_users")
      .select("email", "password", "id")
      .where({ email });

    if (!get_user) {
      return { status: false, message: "Invalid Credential" };
    }
    console.log(get_user);

    const isPassword = await bcrypt.compare(password, get_user[0].password);
    console.log(isPassword);

    if (!isPassword) {
      return { status: false, message: "Invalid Credential" };
    }

    

    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false, message: "Error at getting user details" };
  }
};
