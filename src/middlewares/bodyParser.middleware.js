import responseCode from '../constants/responseCode'

const bodyParsercheck = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.status(responseCode.FAILURE.BAD_REQUEST).json({ status: false, message: "Invalid json body" })
  }
}

export default bodyParsercheck