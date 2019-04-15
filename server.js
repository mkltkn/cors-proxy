const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const cors = require('cors');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 
app.use(cors());

app.get("/json", (req, res) => {
  console.log(req.query);

  let jsonUrl = 'Your URL Will Be Here';

  console.log(jsonUrl);

  (async () => {
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })

      let text = '';
  
      const page = await browser.newPage();
  
      await page.goto( jsonUrl, { waitUntil: 'networkidle2' });
  
      const element = await page.$("pre");
  
      text = await page.evaluate(element => element.textContent, element);
  
      console.log(text)
  
    await browser.close();

    return res.send(text);
  
    } catch (err) {
      console.error(err);
      process.exit();
    }
  })()

});

app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});
 
app.listen(8090, function () {
    console.log('Node app is running on port 8090');
});
 
module.exports = app;