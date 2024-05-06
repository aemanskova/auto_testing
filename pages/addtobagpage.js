const BasePage = require("../pages/basepage");
const { By } = require("selenium-webdriver");
const { assert } = require("chai");

class BagMarketPage extends BasePage {
  constructor(secondProduct, secondProductName) {
    super();
  }

  async open() {
    await this.goToUrl("https://market.yandex.ru/");
  }

  async checkHeader(header) {
    return header === (await driver.findElement(By.xpath("//h1")).getText());
  }

  async clickCatalogButton() {
    await this.click(
      By.xpath(
        "//button[@class='_30-fz button-focus-ring Hkr1q _1pHod _2rdh3 _3rbM-']"
      )
    );
  }

  async clickBigCategory() {
    await this.click(
      By.xpath("//li//a[@href='/catalog--kompiuternaia-tekhnika/54425']")
    );
  }

  async clickMediumCategory() {
    await this.click(
      By.xpath(
        '//div[@class="_16snc"]/child::div/child::a[@href="/catalog--noutbuki-i-planshety/58480?hid=10604359"]'
      )
    );
  }
  async clickSmallCategory() {
    await this.click(
      By.xpath(
        '//div[@class="_16snc"]/child::div/child::a[@href="/catalog--noutbuki/54544/list?hid=91013"]'
      )
    );
  }

  async addSecondProductToBag() {
    await this.clickCatalogButton();
    await this.clickBigCategory();
    await this.clickMediumCategory();
    await this.clickSmallCategory();
    await this.click(
      By.xpath(
        "//div[@data-auto='SerpList']/child::div[position()=1]//ul//li[position()=2]//button[@aria-label='В корзину']"
      )
    );
    assert.equal(
      await driver.findElement(
        By.xpath(
          "//div[@data-auto='SerpList']/child::div[position()=1]//ul//li[position()=2]//button[@aria-label='В корзину']"
        )
      ),
      false
    );
    assert.equal(
      await driver.findElement(
        By.xpath(
          "//div[@data-auto='SerpList']/child::div[position()=1]//ul//li[position()=2]//span[contains(text(),'−')]"
        )
      ),
      true
    );
    assert.equal(
      await driver.findElement(
        By.xpath(
          "//div[@data-auto='SerpList']/child::div[position()=1]//ul//li[position()=2]//span[contains(text(),'+')]"
        )
      ),
      true
    );
    assert.equal(
      await driver.findElement(
        By.xpath(
          '//div[@data-auto="SerpList"]/child::div[position()=1]//ul//li[position()=2]//span[@class="_2cyeu"]'
        )
      ),
      true
    );

    this.click(
      By.xpath("//ul[@class='_32QL9']//li[position()=4]//div[@class='Ebbtu']")
    );
    const productInBagName = await driver.findElement(
      By.xpath("//h3[@class='_3YHut _2SUA6 _33utW _13aK2 _1A5yJ']")
    );
    assert.equal(productInBagName, this.secondProductName);

    const productInBagPrice = await driver.findElement(
      By.xpath(
        "//div[@class='_3gglc']//h3[@class='Jdxhz']//span[@class='_3gYEe']"
      )
    );
    assert.equal(productInBagPrice, this.secondProductPrice);

    const amountOfProducts = await driver.findElement(
      By.xpath('//input[@aria-label="Количество товара"]')
    );

    assert.equal(await amountOfProducts.getAttribute("value"), "1");
    this.click(By.xpath("//button[@aria-label='Увеличить']"));
    assert.equal(await amountOfProducts.getAttribute("value"), "2");

    this.click(By.xpath("//div[@class='_1AwVK']"));
    const message = await driver.findElement(
      By.xpath('//span[@class="_2GVF8 _2SUA6 _33utW IFARr"]')
    );

    assert.equal(await message.getText, "Войдите в аккаунт");
  }

  async logFirstFiveProducts() {
    await this.clickCatalogButton();
    await this.clickBigCategory();
    await this.clickMediumCategory();
    await this.clickSmallCategory();
    let productNames = await driver.findElements(
      By.xpath(
        '//div[@data-auto="SerpList"]/child::div//div[@class="m4M-1"]//h3'
      )
    );

    let productPrices = await driver.findElements(
      By.xpath('//div[@data-auto="SerpList"]/child::div//span[@class="_1ArMm"]')
    );
    this.secondProductName = productNames[1];
    this.secondProductPrice = productPrices[1];
    for (let i = 0; i < 5; i++) {
      console.log(
        `Product: ${await productNames[
          i
        ].getText()}, price: ${await productPrices[i].getText()} руб.`
      );
    }
  }
}

module.exports = BagMarketPage;
