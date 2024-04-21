const fs = require("fs");
const PDFDocument = require("pdfkit");

function generateInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateHeader(doc) {
  doc
    .image("./invoice/logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(20)
    .text("NEXUS Inc.", 110, 57, { position: "center" })
    .fontSize(10)
    .text("NEXUS Inc.", 200, 50, { align: "right" })
    .text("Gota, Ahmedabad", 200, 65, { align: "right" })
    .text("Gujarat, INDIA - 382481", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_no, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
    let i;
    const invoiceTableTop = 330;
  
    doc.font("Helvetica-Bold");
    generateTableRow(
      doc,
      invoiceTableTop,
      "Item",
      "Unit Cost (Rs.)",
      "Discount (%)",
      "Quantity",
      "Total (Rs.)"
    );
    generateHr(doc, invoiceTableTop + 20);
    doc.font("Helvetica");
  
    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30; // Change this value to increase row height
      generateTableRow(
        doc,
        position,
        item.item,
        formatCurrency(item.amount),
        item.discount,
        item.quantity,
        formatCurrency(item.total),
      );
  
      generateHr(doc, position + 20);
    }
  
    const subtotalPosition = invoiceTableTop + (i + 1) * 30; // Change this value to increase row height
    generateTableRow(
      doc,
      subtotalPosition,
      "",
      "",
      "",
      "Subtotal (Rs.):",
      formatCurrency(invoice.subtotal)
    );  
}

function generateTableRow(
    doc,
    y,
    item,
    amount,
    discount,
    quantity,
    total
) {
    doc
    .fontSize(10)
    .text(item, 50, y, { width: 220 }) // Adjust width to fit your needs
    .text(amount, 280, y, { width: 90, align: "right" })
    .text(discount, 370, y, { width: 70, align: "right" }) // Adjust width to fit your needs
    .text(quantity, 425, y, { width: 70, align: "right" })
    .text(total, 468, y, { width: 80, align: "right" });
}
  

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "Thank you for your shopping from NEXUS.",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(price) {
  return (price).toFixed(2);
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = { generateInvoice };