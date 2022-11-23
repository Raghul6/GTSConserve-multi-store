import responseCode from "../../constants/responseCode";
import messages from "../../constants/messages";

import { new_subscription } from "../../models/user/subscription.model";

export const newSubscription = async (req, res) => {
  try {
    const {
      userId,
      subscription_plan_id,
      product_id,
      user_address_id,
      start_date,
      qty,
      customized_days,
    } = req.body;

    if (
      !subscription_plan_id ||
      !product_id ||
      !user_address_id ||
      !start_date ||
      !qty
    ) {
      return res
        .status(responseCode.FAILURE.BAD_REQUEST)
        .json({ status: false, message: messages.MANDATORY_ERROR });
    }

    if (subscription_plan_id == 3) {
      if (!customized_days || customized_days.length === 0) {
        return res
          .status(responseCode.FAILURE.BAD_REQUEST)
          .json({ status: false, message: messages.MANDATORY_ERROR });
      }
    }

    const subscription = await new_subscription(
      userId,
      subscription_plan_id,
      product_id,
      user_address_id,
      start_date,
      qty,
      customized_days
    );

    if (subscription.status) {
      return res
        .status(responseCode.SUCCESS)
        .json({ status: true, message: "Subscription Starts Successfully" });
    } else {
      return res
        .status(responseCode.SUCCESS)
        .json({ status: false, message: subscription.message });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(responseCode.FAILURE)
      .json({ status: false, message: messages.SERVER_ERROR });
  }
};
