import responseCode from "../constants/responseCode";
import {
  createToken,
  parseJwtPayload,
  verifyToken,
} from "../services/jwt.service";

import knex from "../services/db.service";

export const nonMandatoryToken = (req, res, next) => {
  res.locals.optionalToken = true;
  next();
};

export const authenticateJWTSession = async (req, res,next) => {
  let token = req.session.token;
 
  if (!token) {
    req.flash("error","Need To Login First")
    return res.redirect("/auth/login");
  }

  const currentTokenPayload = parseJwtPayload(token.token);


  if(!currentTokenPayload.group_id){
    req.flash("error","Need To Login First")
    return res.redirect("/auth/login");
  }

  req.body.admin_id =currentTokenPayload.user_id 
  req.body.user_group_id =currentTokenPayload.group_id 
  let is_super_admin = false

  if(currentTokenPayload.group_id == 1){
    is_super_admin = true
  }

  req.body.is_super_admin = is_super_admin

  // const checkUser = await knex("users").where({
  //   id: currentTokenPayload.user_id,
  // });
  next()
};

// export const authenticateJWT = async (req, res, next) => {
//   const optionalToken = res.locals.optionalToken ?? false;
//   // console.log(req.headers.authorization)
//   if (req.headers.authorization) {
//     const token = req.headers.authorization;

//     if (token) {
//       const currentTokenPayload = parseJwtPayload(token);
//       const checkUser = await User.findById(currentTokenPayload.user_id);

//       if (checkUser) {
//         try {
//           await verifyToken(token, process.env.TOKEN_SECRET);

//           req.body.userId = currentTokenPayload.user_id;

//           res.set("authorization", token);
//           next();
//         } catch (error) {
//           if (error.isExpired) {
//             const { status, refreshToken, _id } = await User.findById(
//               currentTokenPayload.user_id
//             );
//             if (status) {
//               try {
//                 await verifyToken(
//                   refreshToken,
//                   process.env.REFRESH_TOKEN_SECRET
//                 );

//                 const tokens = createToken({
//                   user_id: currentTokenPayload.user_id,
//                 });
//                 await User.findByIdAndUpdate(
//                   currentTokenPayload.user_id,
//                   { refreshToken: tokens.refreshToken },
//                   { new: true }
//                 );
//                 // await updateUserToken(tokens.refreshToken, currentTokenPayload.user_id)
//                 req.body.userId = currentTokenPayload.user_id;
//                 res.set("authorization", tokens.token);
//                 next();
//               } catch (error) {
//                 if (optionalToken) {
//                   next();
//                 } else {
//                   res
//                     .status(responseCode.FAILURE.UNAUTHORIZED)
//                     .json({ message: "Invalid token" });
//                 }
//               }
//             } else {
//               if (optionalToken) {
//                 next();
//               } else {
//                 res
//                   .status(responseCode.FAILURE.UNAUTHORIZED)
//                   .json({ message: "Invalid token" });
//               }
//             }
//           } else {
//             if (optionalToken) {
//               next();
//             } else {
//               res
//                 .status(responseCode.FAILURE.UNAUTHORIZED)
//                 .json({ message: "Invalid token" });
//             }
//           }
//         }
//       } else {
//         if (optionalToken) {
//           next();
//         } else {
//           res
//             .status(responseCode.FAILURE.UNAUTHORIZED)
//             .json({ message: "User not found" });
//         }
//       }
//     } else {
//       if (optionalToken) {
//         next();
//       } else {
//         res
//           .status(responseCode.FAILURE.UNAUTHORIZED)
//           .json({ message: "Invalid token" });
//       }
//     }
//   } else {
//     if (optionalToken) {
//       next();
//     } else {
//       res
//         .status(responseCode.FAILURE.UNAUTHORIZED)
//         .json({ status: false, message: "Token Missing in Header" });
//     }
//   }
// };
