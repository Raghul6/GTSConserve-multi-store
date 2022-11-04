// sendNotificationToSpecific =function (token) {

// const sdk = require('api')('@onesignal/v9.0#26fd81ml9sbufxr');

// sdk.addADevice({
//   app_id: 'c4878328-bc00-49a1-b741-df30c9ac4621',
//   device_type: 14,
//   language: 'en',
//   timezone: '-28800',
//   game_version: '1.1.1',
//   device_model: 'Android,1',
//   device_os: '15.1.1',
//   session_count: 600,
//   tags: {
//     first_name: 'Jon',
//     last_name: 'Smith',
//     level: '99',
//     amount_spent: '6000',
//     account_type: 'VIP',
//     key_to_delete: '""'
//   },
//   amount_spent: '100.99',
//   playtime: 600,
//   notification_types: 1,
//   // country: 'US'
// })
//   .then(res => console.log(res))
//   .catch(err => console.error(err));

// const sendNotification = function(data) {
//     var headers = {
//       "Content-Type": "application/json;charset=utf-8",
//       "Authorization": `Basic ${process.env.ONE_SIGNAL_REST_API_KEY}`
      
//     };
//     console.log(headers)
//     const options = {
//       host: "onesignal.com",
//       port: 443,  
//       path: "/api/v1/notifications",
//       method: "POST",
//       headers: headers
//     };
//     const https = require('https');
//     const req = https.request(options, function(res) {  
//       res.on('data', function(data) {
//         console.log("Response:");
//         console.log(JSON.parse(data));
//       });
//     });
//     req.on('error', function(e) {
//       console.log("ERROR:");
//       console.log(e);
//     });
//     req.write(JSON.stringify(data));
//     req.end();
//   };


//   const message = {
//     app_id: 'c4878328-bc00-49a1-b741-df30c9ac4621',
//     contents: {"en": "this from medagg app"},
//     included_segments: ["Subscribed Users"],
//     include_phone_numbers: ["+19840730996"],
//     small_icon: "notify_icon",
//   };
//   sendNotification(message);
//   console.log(message.app_id)
// };

import axios from "axios"


export const sendNotification = async (data) => {
  try {
    const instance = axios.create({
      baseURL: "https://onesignal.com/api/v1/notifications",
      headers: {
        authorization: `Basic ${process.env.ONE_SIGNAL_REST_API_KEY}`,
      },
    });

    data.small_icon = "notify_icon";
    data.large_icon =
      "https://pickneats.com/yummychopps/dashboard/assets/img/favicon.png";

    const response = await instance.post(
      `?app_id=${process.env.ONESIGNAL_APP_ID}`,
      data
    );

    return { status: true };
  } catch (error) {
    console.log(error.data);
    return { status: false };
  }
};

// const test = sendNotification({
//   included_segments: ["Subscribed Users"],
//   include_phone_numbers: ["+19840730996"],
//   contents: { en: "Successfully Appoinment Created" },
//   name: "Appoinment",
//   data: {
//     appointment_status: "1",
//     hospital_id: 0,
//     type: 0,
//     appointment_id: "1",
//     // smallIcon: "0",
//   },
// });

//call the above function
// test
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
