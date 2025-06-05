const { errorResponse_catchError, successResponse_ok } = require("../responseObject");

// Logout
module.exports.logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
    });
    if (req.user) {
      return successResponse_ok(res, "User Logout successfully", null);
    } else if (req.venue) {
      return successResponse_ok(res, "Venue Logout successfully", null);
    } else {
      return successResponse_ok(res, "Admin Logout successfully", null);
    }
  } catch (err) {
    return errorResponse_catchError(res, err.message);
  }
};
