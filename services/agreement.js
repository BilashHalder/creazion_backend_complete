const PDFDocument = require('pdfkit');
const fs = require('fs');
const doc = new PDFDocument();

//data contain all the information about agreement

const InvesmentAgreement=(fname)=>{
    doc.pipe(fs.createWriteStream(`./documents/agreement/${fname}.pdf`));
    doc
      .fontSize(25)
      .text('Agreement of Investor', 100, 100);
      doc
      .addPage()
      .fontSize(25)
      .text('2nd page of agreement', 100, 100);
      doc.end();
}


const AssociateAgreement=(data)=>{
    doc.pipe(fs.createWriteStream(`./documents/agreement/${data}.pdf`));
    doc
      .fontSize(25)
      .text('Agreement of Investor', 100, 100);
      doc
      .addPage()
      .fontSize(25)
      .text('2nd page of agreement', 100, 100);
      doc.end();
}
module.exports={InvesmentAgreement,AssociateAgreement}