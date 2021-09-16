// const puppeteer = require("puppeteer");
// const xlsx = require("xlsx");

// const { getQueryHandlerAndSelector } = require("puppeteer");

// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto("https://www.myntra.com/men-tshirts");
//   let links = [];
//   for (let i = 0; i < 2; i++) {
//     let newLinks = await page.$$eval(".product-base a", (allLinks) =>
//       allLinks.map((link) => link.href)
//     );
//     console.log(newLinks);
//     links = [...links, ...newLinks];
//     await page.click(".pagination-next a");
//     await page.waitForNavigation;
//   }
//   console.log(links);
//   const aoaLinks = links.map((l) => [l]);
//   const wb = xlsx.utils.book_new();
//   const ws = xlsx.utils.aoa_to_sheet(aoaLinks);
//   xlsx.utils.book_append_sheet(wb, ws);
//   xlsx.writeFile(wb, "links.xlsx");
//   //   await browser.close();
// })();

hello();

const hello = () => {
  console.log("HELLO WORLD");
};
