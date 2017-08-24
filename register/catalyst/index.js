'use strict';

const puppeteer = require('puppeteer');
const random = require('random-name');
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

    await sleep(5000);

    for (i in argv.email) {
        const page = await browser.newPage();
        await page.goto(argv.ref);

        await sleep(5000);
        await page.click("#signupToggle");
        // await page.screenshot({path: 'catalyst.png'});
        // await sleep(5000);
        await sleep(500);
        await page.focus("#signup-email");
        await sleep(500);
        await page.type(getEmail(argv.email[i]));
        await sleep(500);
        await page.focus("#signup-password");
        await sleep(500);
        await page.type(argv.password);
        await sleep(500);
        await page.focus("#signup-alias");
        await sleep(500);
        await page.type(random.first());
        await sleep(500);
        await page.click("#signup-btn");
        await sleep(5000);
        page.close();
    }
    console.log("finished");
    browser.close();
})();