const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const randomUseragent = require('random-useragent');
const proxyChain = require('proxy-chain');
const devices = require('puppeteer/DeviceDescriptors');

puppeteer.use(StealthPlugin());

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            `--user-agent=${randomUseragent.getRandom()}`
        ]
    });

    const page = await browser.newPage();
    await page.emulate(devices['iPhone X']);

    console.log("Navegando até o site...");
    await page.goto('https://www.google.com', { waitUntil: 'networkidle2' });

    for (let i = 0; i < 5; i++) {
        await page.evaluate(() => {
            window.scrollBy(0, window.innerHeight / 2);
        });
        await page.waitForTimeout(Math.floor(Math.random() * 4000) + 2000);
    }

    console.log("Finalizando sessão...");
    await browser.close();
})();
