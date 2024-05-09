const DogShopTest = require("../pages/dogshop");
const mocha = require("mocha");
const { assert } = require("chai");
const { allure } = require("allure-mocha/dist/MochaAllureReporter");
const { By, Key } = require("selenium-webdriver");

mocha.describe("Animal clothes shop test", function () {
  const dsp = new DogShopTest();

  before(async function () {
    await dsp.open();
  });

  after(async function () {
    await dsp.closeBrowser();
  });

  it("Testing adding to favourites in dog clothes shop", async function () {
    await allure.step("Go to the dog page", async () => {
      await dsp.goToForDogsPage();
      assert.equal(await dsp.title.getText(), "для собак");
    });

    await allure.step("Click add to favourites btn", async () => {
      await dsp.clickAddToFavourites();
      await driver
        .findElements(By.xpath("//div[@class='t1002__bubble']"))
        .then((elements) => assert.equal(elements.length, 1));
      await driver
        .findElements(
          By.xpath(
            "//div[@class='t1002__wishlisticon t1002__wishlisticon_sm t1002__wishlisticon_showed']"
          )
        )
        .then((elements) => assert.equal(elements.length, 1));
    });
    assert.equal(dsp.amountOfFavourites, "1");
    assert.equal(
      await dsp.btn.getAttribute("class"),
      "t1002__addBtn t1002__addBtn_active"
    );

    await allure.step("Open favourites window", async () => {
      await dsp.openFavourites();
      assert.equal(await dsp.favouritesTitle.getText(), "Избранное");
      const favourite = await driver.findElement(
        By.xpath("//a[@class='t1002__product-link']")
      );
      const favouriteName = await favourite.getText();
      assert.equal(favouriteName, dsp.productName);
    });
    await allure.step("Click cross of product", async () => {
      await dsp.closeFavourites();
      await driver
        .findElements(
          By.xpath(
            "//div[@class='t1002__wishlisticon t1002__wishlisticon_sm t1002__wishlisticon_showed']"
          )
        )
        .then((elements) => assert.equal(elements.length, 0));
      assert.equal(
        await dsp.favouriteBtn.getAttribute("class"),
        "t1002__addBtn"
      );
    });
  });
});
