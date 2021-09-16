const xlsx = require("xlsx");
const fs = require("fs");
const data = require("./scrap.json");

if (data) {
  console.log("YO");
}

// const wb = xlsx.utils.book_new();
// const ws = xlsx.utils.json_to_sheet(data);
// xlsx.utils.book_append_sheet(wb, ws);
// xlsx.writeFile(wb, `scrapedData10.xlsx`);
