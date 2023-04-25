const express = require("express");
const router = express.Router();
const ShorturlModel = require("../schema/ShorturlSchema");
const address = require("address");

router.route("/").post((req, res) => {
  //* POST NEW URL [POST]
  var mac = "";
  const MAC = address((err, addrs) => {
    mac = addrs.mac;
  });

  const shorturl = ShorturlModel({
    FULL_URL: req.body.FULL_URL,
    MAC_ID: mac,
    SHORT_URL: Date.now(),
  });
  shorturl.save((err, result) => {
    if (err) res.send(err);
    res.send(result.SHORT_URL);
  });
});

router.route("/:MAC_ID").get(async (req, res) => {
  //* GET SHORTURL BY IP [GET]
  try {
    const shorturl = await ShorturlModel.find({
      MAC_ID: req.params.MAC_ID,
    });
    res.send(shorturl);
  } catch (err) {
    res.send("Got Err " + err);
  }
});

// .delete(async (req, res) => {
//   //* DELETE PRODUCT BY IP [DELETE]
//   try {
//     const shorturl = await ShorturlModel.findById(req.params.IP);
//     shorturl.remove();
//     res.json("Deleted");
//   } catch (err) {
//     res.send("Got Err " + err);
//   }
// });

module.exports = router;
