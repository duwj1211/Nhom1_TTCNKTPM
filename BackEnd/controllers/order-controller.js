const payOS = require("../utils/payos");
const { populate } = require('dotenv');
const { json } = require('express');

const create_payment = async function (req, res) {
  const { description, returnUrl, cancelUrl, amount } = req.body;
  const body = {
    orderCode: Number(String(new Date().getTime()).slice(-6)),
    amount,
    description,
    cancelUrl,
    returnUrl
  };

  try {
    const paymentLinkRes = await payOS.createPaymentLink(body);

    return res.json({
      error: 0,
      message: "Success",
      data: {
        bin: paymentLinkRes.bin,
        checkoutUrl: paymentLinkRes.checkoutUrl,
        accountNumber: paymentLinkRes.accountNumber,
        accountName: paymentLinkRes.accountName,
        amount: paymentLinkRes.amount,
        description: paymentLinkRes.description,
        orderCode: paymentLinkRes.orderCode,
        qrCode: paymentLinkRes.qrCode,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "fail",
      data: null,
    });
  }
}

const get_order_information = async function (req, res) {
  try {
    const order = await payOS.getPaymentLinkInfomation(req.params.orderId);
    if (!order) {
      return res.json({
        error: -1,
        message: "failed",
        data: null,
      });
    }
    return res.json({
      error: 0,
      message: "ok",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
};

const cancel_payment = async function (req, res) {
  try {
    const { orderId } = req.params;
    const body = req.body;
    const order = await payOS.cancelPaymentLink(orderId, body.cancellationReason);
    if (!order) {
      return res.json({
        error: -1,
        message: "failed",
        data: null,
      });
    }
    return res.json({
      error: 0,
      message: "ok",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      error: -1,
      message: "failed",
      data: null,
    });
  }
};

// router.post("/confirm-webhook", async (req, res) => {
//   const { webhookUrl } = req.body;
//   try {
//     await payOS.confirmWebhook(webhookUrl);
//     return res.json({
//       error: 0,
//       message: "ok",
//       data: null,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.json({
//       error: -1,
//       message: "failed",
//       data: null,
//     });
//   }
// });

module.exports = {
  create_payment,
  get_order_information,
  cancel_payment
}
