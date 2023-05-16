const { When, Then, Given, Before, AfterAll, After } = require("cucumber")
const puppeteer = require("puppeteer")
var { setDefaultTimeout } = require('cucumber');
const { expect } = require("chai");

setDefaultTimeout(60 * 1000);
let browser, page, resultPage;

Before(async function () {
    browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 10,
        devtools: false,
        args:
            [
                '--start-maximized'
            ]
    });
    [page] = await browser.pages();
})

Given("Estou na página inciial do Correios", async function () {
    await page.goto("https://www.correios.com.br/")

    await page.screenshot({
        path: 'Screenshot/evidência1.jpg'
    })
})

When('Pesquiso um CEP', async function () {
    await page.type('#relaxation', "029200");
    await page.keyboard.press('Enter');

    const resultPageTarget = await browser.waitForTarget(target => target.opener() === page.target());
    resultPage = await resultPageTarget.page();

    await resultPage.waitForSelector('#navegacao-total');

    await page.screenshot({
        path: 'Screenshot/evidência2.jpg'
    })
})

Then('Três ou mais endereços devem ser apresentados', async function () {
    await resultPage.waitForTimeout(2000);
    const elementHandle = await resultPage.$('#navegacao-total');
    expect(await elementHandle.evaluate(node => node.innerText)).to.equal('1 a 10 de 10');

    await resultPage.screenshot({
        path: 'Screenshot/evidência3.jpg'
    })
})

After(async function(){
    await browser.close();
})
                                                                                                                                      