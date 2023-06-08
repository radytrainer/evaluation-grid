function sendEvaluation() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet();
  const worksheet = sheet.getSheetByName('GRID');

  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();

  var gridName = worksheet.getName();
 

  const htmlTemplate = HtmlService.createTemplateFromFile('email');
  htmlTemplate.gridName = gridName;
  htmlTemplate.lastCol = lastCol;
  htmlTemplate.lastRow = lastRow;
  
  for(var i = 2; i <= lastRow; i++) 
  {
    var headerList = [];
    var scores = []; 
    var currentEmail = worksheet.getRange(i, 1).getValue();
    for(var col = 2; col <= lastCol; col++) {
      var header = worksheet.getRange(1,col).getValue();
      var record = worksheet.getRange(i, col).getValue();
      // console.log(record);
      headerList.push(header);
      scores.push(record);
    }
    htmlTemplate.headerList = headerList;
    htmlTemplate.scores = scores;
    const htmlFormEmail = htmlTemplate.evaluate().getContent();
    //GmailApp.sendEmail(currentEmail, 'Evaluation','Good luck!', {htmlBody: htmlFormEmail});
    
  }

}
