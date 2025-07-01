const { Builder, By, until } = require('selenium-webdriver');
console.log("tesrt")
async function testLogin() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:3000');

    await driver.findElement(By.name('email')).sendKeys('admin@test.com');
    await driver.findElement(By.name('password')).sendKeys('password');
    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.elementLocated(By.id('welcome')), 5000);
    const text = await driver.findElement(By.id('welcome')).getText();

    if (text.includes('Bienvenue')) {
      console.log("Test réussi !");
    } else {
      console.log("Bienvenue pas affiché.");
    }

  } catch (error) {
    console.error("Test échoué :", error);
  } finally { 
  }
}

testLogin();
