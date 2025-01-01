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
      res.send("User Logout successfully");
    } else if (req.venue) {
      res.send("Venue Logout successfully");
    } else {
      res.send("Admin Logout successfully");
    }
  } catch (err) {
    res.send("Internal Server Error");
  }
};
