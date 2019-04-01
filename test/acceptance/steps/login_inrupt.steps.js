const assert = require('assert');
const { Given, When, Then } = require('cucumber');

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

When('I am on the main page to login with Inrupt {string}', function (site) {
    return browser.get(site);
});

When('I select Inrupt ID provider and click on Go button', function() {
    var providerLink = element(by.id('provider'));
    return providerLink.click();
    var solidLink = element(by.id('a3a057f99575'));
    return solidLink.click();
    var goToLink = element(by.id('goLogin'));
    return goToLink.click();
});
