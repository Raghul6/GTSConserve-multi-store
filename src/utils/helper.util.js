import multer from "multer";
import fs from "fs";

export const getPageNumber = (req, data, url, is_super_admin = true) => {
  let adminUrl = is_super_admin ? "super_admin" : "branch_admin";

  const resultsPerPage = process.env.RESULT_PER_PAGE;
  const numOfResults = data.length;
  const numberOfPages = Math.ceil(numOfResults / resultsPerPage);

  let page = req.query.page ? Number(req.query.page) : 1;
  if (page > numberOfPages) {
    return res.redirect(
      `/${adminUrl}/${url}?page=` + encodeURIComponent(numberOfPages)
    );
  } else if (page < 1) {
    return res.redirect(`/super_admin/${url}?page=` + encodeURIComponent("1"));
  }
  //Determine the SQL LIMIT starting number
  const startingLimit = (page - 1) * resultsPerPage;
  //Get the relevant number of POSTS for this starting page

  let iterator = page - 5 < 1 ? 1 : page - 5;
  let endingLink =
    iterator + 4 <= numberOfPages
      ? iterator + 4
      : page + (numberOfPages - page);
  if (endingLink < page + 1) {
    iterator -= page + 1 - numberOfPages;
  }


  return { startingLimit, page, resultsPerPage, numberOfPages , iterator , endingLink };
};



export const multerStorage = (path) => {
  console.log("hittihn");
  fs.access(path, (error) => {
    // To check if the given directory
    // already exists or not
    if (error) {
      // If current directory does not exist
      // then create it
      fs.mkdir(path, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log("New Directory created successfully !!");
        }
      });
    }
  });

  let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      // console.log(req.headers.authorization)
      let index = file.mimetype.indexOf("/") + 1;
      cb(null, Date.now() + "." + file.mimetype.slice(index));
    },
  });

  return storage;
};

// export const uploadImg = multer({ storage: storage }).single("image");

export const phoneNumberValidator = (phoneNumber) => {
  //  console.log(phoneNumber)
  if (!phoneNumber) {
    return false;
  }
  // if (typeof phoneNumber !== 'number') {
  //     console.log('p')

  //     return false
  // }
  if (phoneNumber.toString().length != 10) {
    console.log("c");
    return false;
  }
  return true;
};

export const integerValidator = (value) => {
  if (!value) return false;

  return isNumberValidator(value);
};

export const isNumberValidator = (value) => {
  if (typeof value === Number) return true;

  return false;
};

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}
export default {
  getOffset,
  emptyOrRows,
};
