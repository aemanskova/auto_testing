const LambdaPage = require("../pages/lambda.js");
const { describe, it, before, after } = require("mocha");
const { assert } = require("chai");

describe("Lambda test", function () {
  this.timeout(15000);
  let lp;

  before(async () => {
    lp = new LambdaPage(5, 5);
    await lp.open();
  });

  after(async () => {
    await lp.closeBrowser();
  });

  it("Checking remaining text", async () => {
    assert.isTrue(
      await lp.checkRemainingElem(),
      "Remaining text does not match expected"
    );
  });

  it("Checking first element is not done", async () => {
    const firstItem = await lp.getItem(1);
    assert.isTrue(
      await lp.isItemNotActive(firstItem),
      "First item should not be active"
    );
  });

  it("Clicking the first element and checking if it becomes active and remaining text changes", async () => {
    const firstItem = await lp.getItem(1);
    await lp.clickItem(1);
    assert.isTrue(
      await lp.isItemActive(firstItem),
      "First item did not become active after click"
    );
    assert.isTrue(
      await lp.checkRemainingElem(),
      "Remaining text did not update correctly"
    );
  });

  it("Checking if other list items are not active and clicks them and checks if they become active and remaining text changes", async () => {
    for (let i = 2; i <= lp.total; i++) {
      const item = await lp.getItem(i);
      assert.isFalse(
        await lp.isItemActive(item),
        `Item ${i} should initially be inactive`
      );
      await lp.clickItem(i);
      assert.isTrue(
        await lp.isItemActive(item),
        `Item ${i} did not become active after click`
      );
      assert.isTrue(
        await lp.checkRemainingElem(),
        "Remaining text did not update correctly"
      );
    }
  });

  it("Adding new item", async () => {
    await lp.addItem("New item");
    const newItem = await lp.getItem(lp.total);
    assert.isFalse(
      await lp.isItemActive(newItem),
      "Newly added item should initially be inactive"
    );
    assert.isTrue(
      await lp.checkRemainingElem(),
      "Remaining text did not update correctly after adding an item"
    );
  });

  it("Clicking new element", async () => {
    await lp.clickItem(lp.total);
    assert.isTrue(
      await lp.checkRemainingElem(),
      "Remaining text did not update correctly after clicking new item"
    );
  });
});
