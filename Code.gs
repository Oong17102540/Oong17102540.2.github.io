const SPREADSHEET_ID = '1auUJOS7-xNaLFJ75VDue65Nhs7MbnaXqo_PqefSuTug'; // เปลี่ยนที่นี้
const DATA_RANGE = "BCDR Reserved!A1:R"; // เปลี่ยนที่นี้

function doGet() {
  let html = HtmlService.createTemplateFromFile('Index').evaluate();
  let htmlOutput = HtmlService.createHtmlOutput(html);
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return htmlOutput;
}

function getData() {
  const range = Sheets.Spreadsheets.Values.get(SPREADSHEET_ID, DATA_RANGE);
  const data = range.values;

  // Extract headers
  const headers = data.shift(); // Remove the first row and use it as headers

  // Format the rest of the data as objects
  const tableData = data.map(row => {
    const obj = {};
    for (let i = 0; i < headers.length; i++) {
      obj[headers[i]] = row[i];
    }
    return obj;
  });

  Logger.log(tableData);
  return tableData;
}

function include(fileName) {
  return HtmlService.createHtmlOutputFromFile(fileName).getContent();
}
