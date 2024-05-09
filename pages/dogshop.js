const BasePage = require("../pages/basepage");
const { By, Key } = require("selenium-webdriver");

class MyPage extends BasePage {
  async open() {
    await this.goToUrl("https://barq.ru/");
  }

  async goToForDogsPage() {
    await this.click(
      By.xpath(
        "//div[@class='t396__elem tn-elem tn-elem__4976171441649879670174']//a[@href='/dogs']"
      )
    );
    this.title = await driver.findElement(
      By.xpath("//div[@field='tn_text_1650383652523']")
    );
  }

  async clickAddToFavourites() {
    this.product = await driver.findElement(
      By.xpath(
        "//div[@class='js-store-grid-cont t-store__grid-cont t-container t-store__grid-cont_mobile-one-row']/child::div[position()=1]//div[@class='js-store-prod-name js-product-name t-store__card__title t-typography__title t-name t-name_xs']"
      )
    );
    this.productName = await this.product.getText();
    await this.click(
      By.xpath(
        "//div[@class='js-store-grid-cont t-store__grid-cont t-container t-store__grid-cont_mobile-one-row']/child::div[position()=1]//a[@href='#addtofavorites']"
      )
    );
    this.btn = await driver.findElement(
      By.xpath(
        "//div[@class='js-store-grid-cont t-store__grid-cont t-container t-store__grid-cont_mobile-one-row']/child::div[position()=1]//a[@href='#addtofavorites']"
      )
    );
    this.amountOfFavourites = await driver
      .findElement(
        By.xpath(
          "//div[@class='t1002__wishlisticon t1002__wishlisticon_sm t1002__wishlisticon_showed']//div[@class='t1002__wishlisticon-counter js-wishlisticon-counter']"
        )
      )
      .getText();
  }

  async openFavourites() {
    await this.click(
      By.xpath(
        "//div[@class='t1002__wishlisticon t1002__wishlisticon_sm t1002__wishlisticon_showed']"
      )
    );

    this.favouritesTitle = await driver.findElement(
      By.xpath("//div[@class='t1002__wishlistwin-heading t-name t-name_xl']")
    );
  }

  async closeFavourites() {
    await this.click(By.xpath("//div[@class='t1002__product-del']//img"));
    this.favouriteBtn = await driver.findElement(
      By.xpath(
        "//div[@class='js-store-grid-cont t-store__grid-cont t-container t-store__grid-cont_mobile-one-row']/child::div[position()=1]//a[@href='#addtofavorites']"
      )
    );
  }
}

module.exports = MyPage;
