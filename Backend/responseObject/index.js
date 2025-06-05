const {
  successResponse_ok,
  successResponse_ok_withToken,
  successResponse_created,
} = require("./successResponse");
const {
  errorResponse_badRequest,
  errorResponse_unauthorized,
  errorResponse_alreadyExists,
  errorResponse_catchError,
  errorResponse_notFound,
} = require("./errorResponse");

module.exports = {
  successResponse_created,
  successResponse_ok,
  successResponse_ok_withToken,
  errorResponse_badRequest,
  errorResponse_unauthorized,
  errorResponse_alreadyExists,
  errorResponse_catchError,
  errorResponse_notFound,
};
