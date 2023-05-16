const { When, Then, Given, Before, AfterAll, After } = require("cucumber")
var { setDefaultTimeout } = require('cucumber');
const { expect } = require("chai");
const puppeteer = require('puppeteer');

setDefaultTimeout(60 * 1000);
let browser, page, result;

Before(async function () {
    browser = await puppeteer.launch();
    [page] = await browser.pages();
})

Given("Consulto um endereço via API", async function () {
    await page.goto("https://viacep.com.br/ws/SP/Sao%20Paulo/Freguesia/json/");
});



When('O CEP é válido', async function () {
    const body = await page.$("body");
    const cepsHtml = await body.evaluate(node => node.innerText);
    result = JSON.parse(cepsHtml);
    expect(result).to.be.an('Array');
})

Then('Três ou mais CEPs devem ser apresentados', async function () {
    expect(result).to.have.lengthOf.at.least(3);
})

After(async function(){
    await browser.close();
})
