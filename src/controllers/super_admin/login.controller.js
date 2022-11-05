import knex from "../../services/db.service";

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
    const { name, password } = req.body;

    const create_user = await knex("users").insert({ name, password });

    res.redirect("test");
  } catch (error) {
    console.log(error);
  }
};
