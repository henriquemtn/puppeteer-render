const puppeteer = require("puppeteer");
require("dotenv").config();

const scrapeLogic = async (res) => {
  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();
    const url = "https://www.amazon.com.br/One-Piece-Vol-Eiichiro-Oda/dp/6559604640/ref=sr_1_3?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1DXFFVQLQS62H&dib=eyJ2IjoiMSJ9.ozG8efdIP5nK2frPPadmHltZKwTXYqA69H_X-_Rk6KU0aX__M3ZLg6c86lyq0xnABrCoQqxbrhJXzeo425812Wsp5UPJ6Klf7ag3CYM-obQWshTuODSy74Gfi4yvYDDzheZobpSGH7tkVIDumAeKof9Cb5CJVIQl9YdjKY5A3gOQXe9oR1ycwHSUO6YCgNvXngDuaNn8IBUvA3d4l1FVGMbAmfg4ACy4eOTTuUGOzd03djqquaisBsRGli63eMsL9KbEo-S-Fg-c_j_o3brtV_qCUKzaEviv4oTd403keak.aknlBzDWK3W18Ua-Id0WnlwRpRGTXPdZGdFdsc3xWxo&dib_tag=se&keywords=one+piece&qid=1718670579&sprefix=one+p%2Caps%2C268&sr=8-3";

    await page.goto(url);

    // Esperar que o título do produto esteja disponível na página
    await page.waitForSelector("#productTitle");

    // Extrair o título do produto
    const title = await page.$eval("#productTitle", (element) => element.textContent.trim());

    console.log("Título do produto:", title);
    res.send(title);
  } catch (e) {
    console.error(e);
    res.send(`Something went wrong while running Puppeteer: ${e}`);
  } finally {
    await browser.close();
  }
};

module.exports = { scrapeLogic };
