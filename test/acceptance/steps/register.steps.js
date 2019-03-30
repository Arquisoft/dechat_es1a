let {defineSupportCode} = require('cucumber');
 
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode( function({When, Then}) {
 When('I navigate to {string}', function(site) {
   return browser.get(site);
 });

 Then('the title should be {string}', function(title) {
   return expect(browser.getTitle()).to.eventually.eql(title);
 });

 When('I click the Register button', function() {
      var registerLink = element(by.id('register'));

   return registerLink.click();
 });

 Then('I should see a {string} title', function(string) {
      var t = element(by.id('solidProvider'));


   return expect(t.getText()).to.eventually.eql(string);
 });
});
