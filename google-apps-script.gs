const NOTIFY_EMAIL="averinvetures@gmail.com";
const COMPANY_EMAIL="averinvetures@gmail.com";

function doPost(e) {
  try {
    const data=JSON.parse((e.postData && e.postData.contents) || "{}");
    const ss=SpreadsheetApp.getActiveSpreadsheet();
    let sh=ss.getSheetByName("Enquiries");
    if(!sh){
      sh=ss.insertSheet("Enquiries");
      sh.appendRow(["Timestamp","Name","Company","Phone","Email","Business Area","Message","Page","Status"]);
      sh.setFrozenRows(1);
    }
    sh.appendRow([
      new Date(), data.name||"", data.company||"", data.phone||"",
      data.email||"", data.requirement||"", data.message||"",
      data.page||"", "New"
    ]);

    const subject="New Business Enquiry - AVERIN VENTURES";
    const body="New business enquiry received.\n\n"+
      "Name: "+(data.name||"")+"\n"+
      "Company: "+(data.company||"")+"\n"+
      "Phone: "+(data.phone||"")+"\n"+
      "Email: "+(data.email||"")+"\n"+
      "Business Area: "+(data.requirement||"")+"\n"+
      "Message: "+(data.message||"")+"\n"+
      "Page: "+(data.page||"");
    MailApp.sendEmail(NOTIFY_EMAIL,subject,body);

    if(data.email){
      MailApp.sendEmail(
        data.email,
        "Thank you for contacting AVERIN VENTURES",
        "Dear "+(data.name||"Sir/Ma'am")+",\n\nThank you for contacting AVERIN VENTURES PRIVATE LIMITED. We have received your enquiry and our business team will contact you shortly.\n\nRegards,\nAVERIN VENTURES PRIVATE LIMITED\n+91 9648361634\naverinvetures@gmail.com"
      );
    }

    return ContentService.createTextOutput(JSON.stringify({success:true}))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({success:false,error:String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
