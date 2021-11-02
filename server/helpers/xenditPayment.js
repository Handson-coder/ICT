const Xendit = require("xendit-node");
const x = new Xendit({
  secretKey: process.env.SK_PAYMENT,
});
const { Invoice } = x;
const invoiceSpecificOptions = {};
const XenditInvoice = new Invoice(invoiceSpecificOptions);
module.exports = { XenditInvoice };