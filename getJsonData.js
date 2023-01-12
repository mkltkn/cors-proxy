const puppeteer = require('puppeteer');

const getJsonData = async (jsonUrl) => {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(jsonUrl, { waitUntil: 'networkidle2' });

        // You should change this tag too if needed
        const element = await page.waitForSelector("pre");
        const scrapedData = await page.evaluate(element => element.textContent, element);

        await browser.close();
        return scrapedData;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports.getJsonData = getJsonData;