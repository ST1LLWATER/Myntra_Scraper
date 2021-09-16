const puppeteer = require("puppeteer");
const xlsx = require("xlsx");
require("events").EventEmitter.defaultMaxListeners = 0;

let categories = [
  "https://www.myntra.com/mens-shorts",
  // "https://www.myntra.com/men-trackpants",
  // "https://www.myntra.com/men-briefs-and-trunks",
  // "https://www.myntra.com/men-boxers",
  // "https://www.myntra.com/men-innerwear-vests",
  // "https://www.myntra.com/men-nightwear",
  // "https://www.myntra.com/men-thermals",
  // "https://www.myntra.com/men-casual-shoes",
  // "https://www.myntra.com/men-sports-shoes",
  // "https://www.myntra.com/men-formal-shoes",
  // "https://www.myntra.com/men-sneakers",
  // "https://www.myntra.com/men-sandals",
  // "https://www.myntra.com/men-flip-flops",
  // "https://www.myntra.com/men-socks",
];

async function getPageData(url, page) {
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.267"
  );
  await page.goto(url);

  const brandTitle = await page.$$eval(".pdp-price-info h1", (brandTitle) =>
    brandTitle.map((name) => name.textContent)
  );

  const [brand, itemName] = brandTitle;

  const ratings = await page.$$eval(".index-overallRating div", (ratingInfo) =>
    ratingInfo.map((info) => info.textContent)
  );

  ratings.splice(1, 1);

  const [avgRating, totalRatings] = ratings;

  let images = await page.$$eval(".image-grid-image", (images) =>
    images.map((image) => image.style.backgroundImage)
  );

  let x = images.toString();
  images = x;

  // for (image of images) {
  //   let newUrl = image.match(/\((.*?)\)/);
  //   console.log(newUrl[0]);
  // }

  const priceNdiscount = await page.$$eval(
    ".pdp-discount-container span",
    (priceNdiscount) => priceNdiscount.map((info) => info.textContent)
  );

  priceNdiscount.splice(3, 3);

  const [currentPrice, originalPrice, discount] = priceNdiscount;

  let sizes = await page.$$eval(".size-buttons-unified-size", (sizes) =>
    sizes.map((size) => size.textContent)
  );

  x = sizes.toString();
  sizes = x;

  let isDetails = await page.evaluate(() => {
    let detailsExist = document.querySelector(
      ".pdp-product-description-content"
    );
    if (detailsExist) {
      return true;
    } else {
      return false;
    }
  });

  if (isDetails) {
    var details = await page.$eval(
      ".pdp-product-description-content",
      (detail) => detail.textContent
    );
  }

  let isDescContent = await page.evaluate(() => {
    let detailsExist = document.querySelector(".pdp-sizeFitDescContent");
    if (detailsExist) {
      return true;
    } else {
      return false;
    }
  });

  if (isDescContent) {
    var sizeAndFit = await page.$eval(
      ".pdp-sizeFitDescContent",
      (info) => info.textContent
    );

    var materialAndCare = await page.$$eval(
      ".pdp-sizeFitDescContent",
      (infos) => infos.map((info) => info.textContent)
    );

    x = materialAndCare[1];
    materialAndCare = x;
  }

  const pId = await page.$eval(".supplier-styleId", (id) => id.textContent);

  return {
    brand: brand,
    itemName: itemName,
    avgRating: avgRating,
    totalRatings: totalRatings,
    details: details,
    images: images,
    sizeAndFit: sizeAndFit,
    materialAndCare: materialAndCare,
    effectivePrice: currentPrice,
    price: originalPrice,
    discount: discount,
    sizes: sizes,
    pId: pId,
  };
}

async function getLinks(link) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.267"
  );
  await page.goto(link);
  let links = [];
  for (let i = 0; i < 1; i++) {
    let newLinks = await page.$$eval(".product-base a", (allLinks) =>
      allLinks.map((link) => link.href)
    );
    // console.log(newLinks);
    links = [...links, ...newLinks];

    let nextButton = await page.evaluate(() => {
      let el = document.querySelector(".pagination-next a");
      return el ? el.innerText : "";
    });

    if (nextButton) {
      await page.click(".pagination-next a");
      await page.waitForNavigation;
    }
  }
  await browser.close();
  return links;
}

async function main() {
  const allLinks = [];

  for (category of categories) {
    let data = await getLinks(category);
    allLinks.push(data);
  }

  console.log(allLinks);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const scrapedData = [];

  for (data of allLinks) {
    console.log(data);
    for (link of data) {
      const data = await getPageData(link, page);
      scrapedData.push(data);
    }
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(scrapedData);
    xlsx.utils.book_append_sheet(wb, ws);
    xlsx.writeFile(wb, `scrapedData5.xlsx`);
  }

  // const wb = xlsx.utils.book_new();
  // const ws = xlsx.utils.json_to_sheet(scrapedData);
  // xlsx.utils.book_append_sheet(wb, ws);
  // xlsx.writeFile(wb, "scrapedData.xlsx");

  console.log(scrapedData);
}

main();
