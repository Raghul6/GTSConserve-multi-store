import knex from "../../../services/db.service";
import { getPageNumber } from "../../../utils/helper.util";

export const getFeedback = async (req, res) => {
  try {
    let loading = true;

    let data_length = [];

    data_length = await knex("feedback_message").select("id");

    if (data_length.length === 0) {
      loading = false;
      return res.render("super_admin/settings/feedback", {
        data: data_length,
      });
    }

    let {
      startingLimit,
      page,
      resultsPerPage,
      numberOfPages,
      iterator,
      endingLink,
    } = await getPageNumber(req, res, data_length, "settings/get_feedback");

    let results;

    results = await knex.raw(
      `SELECT id,message,status FROM feedback_message  LIMIT ${startingLimit},${resultsPerPage}`
    );

    const data = results[0];

    loading = false;
    res.render("super_admin/settings/feedback", {
      data,
      page,
      iterator,
      endingLink,
      numberOfPages,

      loading,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const { message, id } = req.body;

    await knex("feedback_message").update({ message }).where({id})

    req.flash("success", "Updated SuccessFully");
    return res.redirect("/super_admin/settings/get_feedback");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const createFeedback = async (req, res) => {
  try {
    const { message } = req.body;

    await knex("feedback_message").insert({ message });

    req.flash("success", "Feedback Created SuccessFully");
    return res.redirect("/super_admin/settings/get_feedback");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};

export const  updateFeedbackStatus = async (req, res) => {
  try {
    const { status, id } = req.body;

    if (status == "1") {
      await knex("feedback_message").update({ status: "0" }).where({ id: id });
    } else {
      await knex("feedback_message").update({ status: "1" }).where({ id: id });
    }

    req.flash("success", "Updated SuccessFully");
    return res.redirect("/super_admin/settings/get_feedback");
  } catch (error) {
    console.log(error);
    res.redirect("/home");
  }
};
