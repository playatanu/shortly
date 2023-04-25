const express = require("express");
const router = express.Router();
const ShorturlModel = require("../schema/ShorturlSchema");

router.route("/:SHORT_URL").get(async (req, res) => {
  //* GET SHORTURL BY IP [GET]
  try {
    const shorturl = await ShorturlModel.findOne({
      SHORT_URL: req.params.SHORT_URL,
    });

    shorturl.VIEW++;
    shorturl.save();

    res.redirect(shorturl.FULL_URL);
    response.end();
  } catch (err) {
    res.send("Got Err " + err);
  }
});

module.exports = router;
