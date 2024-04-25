const StudentGroupPage = require("../pages/checkgrouppage");
const mocha = require("mocha");
const { assert } = require("chai");

mocha.describe("Student Group test", async () => {
  const sp = new StudentGroupPage();

  before(async () => {
    await sp.open();
  });

  after(async () => {
    await sp.closeBrowser();
  });

  it("opens schedule page", async () => {
    await sp.openTimeTable();
  });

  it("opens schedule view page", async () => {
    await sp.openTimeTableView();
  });

  it("fills in group", async () => {
    await sp.enterGroup();
  });

  it("checks if needed group is there", async () => {
    assert.equal(await sp.checkGroupInList(), true);
  });

  it("goes to group schedule", async () => {
    await sp.goToGroupTimeTable();
  });

  it("checks if current day is highlighted", async () => {
    assert.equal(await sp.checkIfCurrentDayColored(), true);
  });
});
