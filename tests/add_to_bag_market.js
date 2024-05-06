const BagMarketPage = require("../pages/addtobagpage");
const mocha = require("mocha");
const { assert } = require("chai");

mocha.describe("Yandex Market Add to bag test", async () => {
  const ybp = new BagMarketPage();

  before(async () => {
    await ybp.open();
  });

  after(async () => {
    await ybp.closeBrowser();
  });

  it("open category", async () => {
    await ybp.clickCatalogButton();
    await ybp.clickBigCategory();
    await ybp.clickMediumCategory();
    await ybp.clickSmallCategory();
    await ybp.checkHeader("Ноутбуки");
  });

  it("log", async () => {
    await ybp.logFirstFiveProducts();
  });
  it("add second product to bag", async () => {
    await ybp.addSecondProductToBag();
  });
});
