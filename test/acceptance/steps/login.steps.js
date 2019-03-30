const assert = require('assert');
const { Given, When, Then } = require('cucumber');

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

When('I am on the main page {string}', function (site) {
    return browser.get(site);
});

Then('I am on the main page {string}', function (site) {
    return browser.get(site);
});

/*
When('I select Solid Community ID provider', function() {
    var providerLink = element(by.id('provider'));
    return providerLink.click();
    //var solidLink = element(by.id('a63f3defa536'));
    //return solidLink.click();
});
*/
