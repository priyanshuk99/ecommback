const express = require('express');
const router = express.Router();

const { makepayment } = require("../controllers/stripepayment.js")

router.post("/stripepayment", makepayment)

module.exports = router;