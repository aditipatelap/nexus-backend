const productCollection = require('../models/productModel.js');
const orderCollection = require('../models/orderModel.js');
const { generateInvoice } = require("./generateInvoice.js");

const invoice = {
    shipping: {
      name: "",
      address: "",
    },
    items: [
      {
        item: "",
        amount: null,
        discount: null,
        quantity: 1,
        total: null,
      },
    ],
    subtotal: 0, // Initialize subtotal to 0
    invoice_no: 'INV123456'
};
  

const createInvoiceData = async (orderId, productId) => {
  try {
    const product = await productCollection.findOne({ _id: productId });
    const order = await orderCollection.findOne({ _id: orderId });

    invoice.shipping.name = order.billName;
    invoice.shipping.address = order.billAddress;
    invoice.items[0].item = product.name.substring(0, 40);
    invoice.items[0].amount = parseFloat(product.price);
    invoice.items[0].discount = parseFloat(product.discount);

    // Calculate total for each item and update the 'total' property
    invoice.items.forEach(item => {
        item.total = item.amount - (item.amount * item.discount / 100);
    });
    
    // Calculate subtotal by summing up the total of each item
    invoice.subtotal = invoice.items.reduce((accumulator, item) => accumulator + item.total, 0);
    
    // call function to generate invoice
    generateInvoice(invoice, "./invoice/invoice.pdf");

    console.log("Invoice generated");
  } 
  catch (error) {
    console.error(error);
  }
}

module.exports = { createInvoiceData };