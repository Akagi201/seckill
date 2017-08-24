'use strict';

const puppeteer = require('puppeteer');
const yargs = require('yargs');
const config = require('./config.json');
const argv = yargs.default(config).argv;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getEmail(s) {
    return s.split("----")[0]
}

function getPasswd(s) {
    return s.split("----")[1]
}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    let i = 0;

    for (i in argv.email) {
        const page = await browser.newPage();
        await page.goto("https://www.enigma.co/catalyst/#/login");

        await sleep(500);
        await page.focus("#login-email");
        await sleep(500);
        await page.type(getEmail(argv.email[i]));
        await sleep(500);
        await page.focus("#login-password");
        await sleep(500);
        await page.type(argv.password);
        await sleep(500);
        await page.click("#login-btn");
        await sleep(500);
        await page.click("#refer-banner a");
        // page.close();
    }

    // browser.close();
})();