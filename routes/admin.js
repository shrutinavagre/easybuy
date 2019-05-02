var router = require("express").Router();
var Category = require("../models/category");
var passportConf = require("../config/passport");

router.get("/add-category", passportConf.isAuthenticated, function(
  req,
  res,
  next
) {
  if (req.user.isAdmin) {
    res.render("admin/add-category", { message: req.flash("success") });
  } else {
    res.redirect("/login");
  }
});

router.post("/add-category", passportConf.isAuthenticated, function(
  req,
  res,
  next
) {
  var category = new Category();
  category.name = req.body.name;

  category.save(function(err) {
    if (err) return next(err);
    req.flash("success", "Successfully added a category");
    return res.redirect("/add-category");
  });
});

module.exports = router;
