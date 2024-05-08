const BagMarketPage = require("../pages/addtobagpage");
const mocha = require("mocha");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");
const { allure } = require("allure-mocha/dist/MochaAllureReporter");

mocha.describe("Yandex Market Add to bag test", function () {
  const ybp = new BagMarketPage();

  before(async function () {
    await ybp.open();
  });

  after(async function () {
    await ybp.closeBrowser();
  });

  it("should add a product to the bag", async function () {
    await allure.step("open category", async function () {
      await ybp.clickCatalogButton();
      await ybp.clickBigCategory();
      await ybp.clickMediumCategory();
      await ybp.clickSmallCategory();
      await ybp.checkHeader("Ноутбуки");
    });

    await allure.step("log products", async function () {
      await ybp.logFirstFiveProducts();
      console.log(ybp.secondProductName);
    });

    await allure.step("add second product to bag", async function () {
      await ybp.addSecondProductToBag();
      await driver
        .findElements(
          By.xpath(
            "//div[@data-auto='SerpList']/child::div[position()=1]//ul//li[position()=2]//button[@aria-label='В корзину']"
          )
        )
        .then((elements) => assert.equal(elements.length, 0));
      await driver
        .findElements(
          By.xpath(
            "//div[@data-auto='SerpList']/child::div[position()=1]//ul//li[position()=2]//span[contains(text(),'+')]"
          )
        )
        .then((elements) => assert.equal(elements.length, 1));
      await driver
        .findElements(
          By.xpath(
            "//div[@data-auto='SerpList']/child::div[position()=1]//ul//li[position()=2]//span[contains(text(),'−')]"
          )
        )
        .then((elements) => assert.equal(elements.length, 1));

      await driver
        .findElements(
          By.xpath(
            '//div[@data-auto="SerpList"]/child::div[position()=1]//ul//li[position()=2]//span[@class="_2cyeu"]'
          )
        )
        .then((elements) => assert.equal(elements.length, 1));
      await ybp.clickProduct();
      // assert.equal(ybp.productInBagName, ybp.secondProductName);
      // assert.equal(ybp.productInBagPrice, ybp.secondProductPrice);
      await ybp.findAmountOfProducts();
      assert.equal(await ybp.amountOfProducts.getAttribute("value"), "1");
      await ybp.increaseAmount();
      assert.equal(await ybp.amountOfProducts.getAttribute("value"), "2");
      await ybp.clickCross();
      assert.equal(await ybp.message.getText(), "Войдите в аккаунт");
    });
  });
});
