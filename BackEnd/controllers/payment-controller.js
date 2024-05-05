const payOS = require("../utils/payos");
const { populate } = require('dotenv');
const { json } = require('express');


const payment_handler = async function (req, res) {
  console.log("payment handler");
  const webhookData = payOS.verifyPaymentWebhookData(req.body);

  if (
    ["Ma giao dich thu nghiem", "VQRIO123"].includes(webhookData.description)
  ) {
    return res.json({
      error: 0,
      message: "Ok",
      data: webhookData
    });
  }

  // Source code uses webhook data

  return res.json({
    error: 0,
    message: "Ok",
    data: webhookData
  });
};

module.exports = payment_handler;
