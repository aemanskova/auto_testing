const DogShopTest = require("../pages/dogshop");
const mocha = require("mocha");
const { assert } = require("chai");
const { allure } = require("allure-mocha/dist/MochaAllureReporter");
const { By, Key } = require("selenium-webdriver");
const fs = require("fs");

mocha.describe("Animal clothes shop test", function () {
  const dsp = new DogShopTest();

  before(async function () {
    await dsp.open();
  });

  after(async function () {
    await dsp.closeBrowser();
  });

  it("Testing adding to favourites in dog clothes shop", async function () {
    try {
      await allure.step("Go to the dog page", async () => {
        await dsp.goToForDogsPage();
        assert.equal(await dsp.title.getText(), "для собак");
        const screenshotPath = await dsp.takeScreenshot(
          driver,
          "screenshot_dog_page.png"
        );
        allure.attachment(
          "Dog Page Screenshot",
          fs.readFileSync(screenshotPath),
          "image/png"
        );
      });

      await allure.step("Click add to favourites btn", async () => {
        await dsp.clickAddToFavourites();
        assert.equal(dsp.addToFavouriteBtnShowed.length, 1);
        assert.equal(dsp.amountOfFavourites, "1");
        assert.equal(
          await dsp.btn.getAttribute("class"),
          "t1002__addBtn t1002__addBtn_active"
        );
        const screenshotPath = await dsp.takeScreenshot(
          driver,
          "screenshot_dog_favourites.png"
        );
        allure.attachment(
          "Dog Page Screenshot",
          fs.readFileSync(screenshotPath),
          "image/png"
        );
      });
      await allure.step("Open favourites window", async () => {
        await dsp.openFavourites();
        assert.equal(dsp.favouritesTitleName, "Избранноееее");
        await dsp.findFavourite();
        await driver.sleep(1000);
        assert.equal(dsp.favouriteName, dsp.productName);
        const screenshotPath = await dsp.takeScreenshot(
          driver,
          "screenshot_dog_favourites.png"
        );
        allure.attachment(
          "Dog Page Screenshot",
          fs.readFileSync(screenshotPath),
          "image/png"
        );
      });
      await allure.step("Click cross of product", async () => {
        await dsp.closeFavourites();
        assert.equal(
          await dsp.favouriteBtn.getAttribute("class"),
          "t1002__addBtn"
        );
        const screenshotPath = await dsp.takeScreenshot(
          driver,
          "screenshot_dog_favourites.png"
        );
        allure.attachment(
          "Dog Page Screenshot",
          fs.readFileSync(screenshotPath),
          "image/png"
        );
      });
    } catch (error) {
      const screenshotError = await dsp.takeScreenshot(driver, "error.png");
      allure.attachment("Error", fs.readFileSync(screenshotError), "image/png");
      throw error;
    }
  });
});
