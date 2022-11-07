import knex from "../../services/db.service";

export const test = async (req, res) => {
  res.render("form");
  // const user = await knex("users").select("name", "password").where({ id: 1 });

  // console.log(user);

  // res.render("test", { user });
};

export const form = async (req, res) => {
  res.render("form");
};

export const index = async (req, res) => {
  res.render("apps_todoList");
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
