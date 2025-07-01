const { Builder, By, until } = require('selenium-webdriver');

async function testLogin() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log("🚀 Ouverture de l'application...");
    await driver.get('http://localhost:3000');

    console.log("⏳ Remplissage des champs...");
    await driver.findElement(By.id('email')).sendKeys('admin@test.com');
    await driver.findElement(By.id('password')).sendKeys('password');
    await driver.findElement(By.css('button[type="submit"]')).click();

    console.log("🔄 Attente de la redirection vers /dashboard...");
    await driver.wait(until.urlContains('/dashboard'), 5000);

    const url = await driver.getCurrentUrl();
    if (url.includes('/dashboard')) {
      console.log("✅ Connexion réussie !");
    } else {
      console.log("❌ Redirection échouée !");
    }
  } catch (error) {
    console.error("❌ Erreur lors du test :", error.message);
  } finally {
    await driver.quit();
  }
}

testLogin();
