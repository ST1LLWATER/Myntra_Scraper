const puppeteer = require("puppeteer");
const xlsx = require("xlsx");
require("events").EventEmitter.defaultMaxListeners = 0;

// let categories = [
// "https://www.myntra.com/women-kurtas-kurtis-suits",
// "https://www.myntra.com/ethnic-tops",
// "https://www.myntra.com/women-ethnic-wear",
// "https://www.myntra.com/women-ethnic-bottomwear?f=categories%3AChuridar%2CLeggings%2CSalwar",
// "https://www.myntra.com/skirts-palazzos",
// "https://www.myntra.com/saree",
// "https://www.myntra.com/dress-material",
// "https://www.myntra.com/lehenga-choli",
// "https://www.myntra.com/dupatta-shawl",
// "https://www.myntra.com/women-jackets",
// "https://www.myntra.com/women-accessories",
// "https://www.myntra.com/women-watches",
// "https://www.myntra.com/dresses?f=Gender%3Amen%20women%2Cwomen",
// "https://www.myntra.com/jumpsuits?f=Gender%3Amen%20women%2Cwomen",
// "https://www.myntra.com/tops",
// "https://www.myntra.com/women-jeans",
// "https://www.myntra.com/women-trousers",
// "https://www.myntra.com/women-shorts-skirts",
// "https://www.myntra.com/women-shrugs",
// "https://www.myntra.com/women-sweaters-sweatshirts",
// "https://www.myntra.com/women-jackets-coats",
// "https://www.myntra.com/women-blazers-waistcoats",
// "https://www.myntra.com/women-plus-store",
// "https://www.myntra.com/women-sunglasses",
// "https://www.myntra.com/flats",
// "https://www.myntra.com/women-casual-shoes",
// "https://www.myntra.com/women-heels",
// "https://www.myntra.com/women-boots-menu?f=Type_article_attr%3Aflat%20boots%2Cheeled%20boots",
// "https://www.myntra.com/women-sports-shoes",
// "https://www.myntra.com/women-sportswear-clothing",
// "https://www.myntra.com/women-sports-shoes",
// "https://www.myntra.com/women-sports-accessories",
// "https://www.myntra.com/bra",
// "https://www.myntra.com/women-briefs",
// "https://www.myntra.com/women-clothing-shapewear",
// "https://www.myntra.com/women-loungewear-and-nightwear",
// "https://www.myntra.com/women-swimwear",
// "https://www.myntra.com/camisoles-and-thermals",
// "https://www.myntra.com/makeup",
// "https://www.myntra.com/skin-care?f=gender%3Amen%20women%2Cwomen",
// "https://www.myntra.com/women-personal-care?f=brand%3ABobbi%20Brown%2CBvlgari%2CCalvin%20Klein%2CClinique%2CDAVIDOFF%2CDermalogica%2CForest%20Essentials%2CKAMA%20AYURVEDA%2CSalvatore%20Ferragamo",
// "https://www.myntra.com/lipstick",
// "https://www.myntra.com/women-perfumes",
// ];

let categories = [
  "https://www.myntra.com/hair-cream",
  "https://www.myntra.com/kama-ayurveda",
  "https://www.myntra.com/hair-conditioner",
  "https://www.myntra.com/hair-colour",
  "https://www.myntra.com/bath-and-body-works",
  "https://www.myntra.com/hair-gel",
  "https://www.myntra.com/m.a.c",
  "https://www.myntra.com/loreal",
  "https://www.myntra.com/face-moisturisers",
  "https://www.myntra.com/body-lotion",
  "https://www.myntra.com/deodorant",
  "https://www.myntra.com/forest-essentials",
  "https://www.myntra.com/maybelline",
  "https://www.myntra.com/kajal",
  "https://www.myntra.com/hair-straightener",
  "https://www.myntra.com/shampoo",
  "https://www.myntra.com/hair-wax",
  "https://www.myntra.com/beard-oil",
  "https://www.myntra.com/eyeshadow",
  "https://www.myntra.com/lotus-herbals",
  "https://www.myntra.com/eyeliner",
  "https://www.myntra.com/body-scrub",
  "https://www.myntra.com/hair-accessory",
  "https://www.myntra.com/perfumes",
  "https://www.myntra.com/lip-balm",
  "https://www.myntra.com/nail-polish",
  "https://www.myntra.com/eye-cream",
  "https://www.myntra.com/hair-dryer",
  "https://www.myntra.com/body-wash",
  "https://www.myntra.com/mamaearth",
  "https://www.myntra.com/serum",
  "https://www.myntra.com/philips",
  "https://www.myntra.com/loreal-professionnel",
  "https://www.myntra.com/face-wash",
  "https://www.myntra.com/trimmer",
  "https://www.myntra.com/sunscreen",
  "https://www.myntra.com/epilator",
  "https://www.myntra.com/makeup-kit",
  "https://www.myntra.com/the-body-shop",
  "https://www.myntra.com/mcaffeine",
  "https://www.myntra.com/cleanser",
  "https://www.myntra.com/hand-cream",
  "https://www.myntra.com/beauty-gift-set",
  "https://www.myntra.com/lip-gloss",
  "https://www.myntra.com/compact",
  "https://www.myntra.com/mask-and-peel",
  "https://www.myntra.com/foundation",
  "https://www.myntra.com/body-mist",
  "https://www.myntra.com/nivea",
  "https://www.myntra.com/mascara",
  "https://www.myntra.com/hair-serum",
  "https://www.myntra.com/biotique",
  "https://www.myntra.com/lakme",
  "https://www.myntra.com/hair-oil",
  "https://www.myntra.com/primer",
  "https://www.myntra.com/lipstick",
  "https://www.myntra.com/concealer",
  "https://www.myntra.com/lip-liner",
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

  await page.waitForSelector(".supplier-styleId");

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

async function getLinks(link, page) {
  await page.setViewport({
    width: 1530,
    height: 750,
  });
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.267"
  );
  // const browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();

  await page.goto(link);

  var x = 10;
  // var total = 10;
  // const sleep = (duration) =>
  //   new Promise((resolve) => setTimeout(resolve, duration));

  let links = [];
  while (await page.$(".pagination-next a")) {
    x--;

    let newLinks = await page.$$eval(".product-base a", (allLinks) =>
      allLinks.map((link) => link.href)
    );
    // console.log(newLinks);
    links = [...links, ...newLinks];

    // total -= 1;
    // let nextButton = await page.evaluate(() => {
    //   let el = document.querySelector(".pagination-next a");
    //   return el ? el.innerText : "";
    // });

    // if (nextButton) {
    await page.waitForSelector(".pagination-next a");

    // var isNextPage = "";

    // await page.evaluate(() => {
    //   console.log(isNextPage);
    //   isNextPage = document.querySelector(".pagination-next a");
    // });
    console.log("IN LOOP");

    await page.evaluate(() => {
      document.querySelector(".pagination-next a").click();
    });
  }

  // await page.waitForNavigation({ waitUntil: "networkidle2" });
  // }
  console.log("OUTTA LOOP", x);
  return links;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  const allLinks = [];

  for (category of categories) {
    let data = await getLinks(category, page);
    allLinks.push(data);
  }

  await browser.close();

  //   console.log(allLinks);

  //   const scrapedData = [];

  //   for (data of allLinks) {
  //     console.log(data);
  //     for (link of data) {
  //       const data = await getPageData(link, page);
  //       scrapedData.push(data);
  //     }

  // let links = [];

  // for (data of allLinks) {
  //   for (link of data) {
  //     links.push(link);
  //   }
  // }

  var merged = [].concat.apply([], allLinks);
  let x = [];
  x.push(merged);

  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.aoa_to_sheet(x);
  xlsx.utils.book_append_sheet(wb, ws);
  xlsx.writeFile(wb, `scrapedData.xlsx`);
}

// const wb = xlsx.utils.book_new();
// const ws = xlsx.utils.json_to_sheet(scrapedData);
// xlsx.utils.book_append_sheet(wb, ws);
// xlsx.writeFile(wb, "scrapedData.xlsx");

//   console.log(scrapedData);
// }

main();
