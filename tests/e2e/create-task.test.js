const { Builder, By, until } = require('selenium-webdriver');

async function testCreateTask() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Accède directement à la page des tâches
    await driver.get('http://localhost:3000/tasks');

    // Attente que la page charge le bouton de création
    await driver.wait(until.elementLocated(By.css('button#create-task')), 5000);
    console.log("✅ Page des tâches chargée");

    // Clique sur "Nouvelle tâche"
    await driver.findElement(By.css('button#create-task')).click();

    // Remplit le formulaire
    await driver.findElement(By.id('task-title')).sendKeys('Tâche E2E sans login');
    await driver.findElement(By.id('task-desc')).sendKeys('Créée automatiquement');

    // Clique sur le bouton de soumission
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Attend que la tâche apparaisse dans la liste
    await driver.wait(until.elementLocated(By.xpath("//*[contains(text(),'Tâche E2E sans login')]")), 5000);

    console.log("✅ Tâche créée et visible !");

  } catch (error) {
    console.error("❌ Erreur durant le test :", error.message);
  } finally {
    await driver.quit();
  }
}

testCreateTask();
