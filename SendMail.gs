function sendEmails() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  
  // Assuming the first row contains headers
  var headers = data.shift();
  var nameIndex = headers.indexOf('First Name');
  var emailIndex = headers.indexOf('Mail');
  var intimeIndex = headers.indexOf('Time IN');
  var outtimeIndex = headers.indexOf('Time OUT');
  var dateIndex = headers.indexOf('Date');
  
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var name = row[nameIndex];
    var email = row[emailIndex];
    var intime = row[intimeIndex];
    var outtime = row[outtimeIndex];
    var date = row[dateIndex];
    
    // Format the date
    var formattedDate = Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'MMMM dd, yyyy');
    
    // Extract time portion from intime and outtime
    var intimeObj = new Date(intime);
    var outtimeObj = new Date(outtime);
    var intimeStr = intimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    var outtimeStr = outtimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Customize your email subject and body here
    var subject = "Please find your today's attendance for Design Lab";
    var body = "Dear " + name + ",\n\n";
    body += "Your In-time was: " + intimeStr + "\n";
    body += "Your Out-time was: " + outtimeStr + "\n";
    body += "Date: " + formattedDate + "\n\n";
    
    // Send the email
    MailApp.sendEmail(email, subject, body);
  }
}
