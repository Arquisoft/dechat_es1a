const assert=require('assert');
const { Given, When, Then }=require('cucumber');

function login(user, password){
    if(user==='testerberme' && password==='Tester_berme2019')
        return "Ok";
    else
        return "Nope";
}

Given('Solid Community ID provider and user {string} with password {string}', function(user, password){
    this.user=user;
    this.password=password;
});

When('I try to login him', function(){
    this.response=login(this.user, this.password);
});

Then('I receive the answer {string}', function(expected){
    assert.equal(this.response, expected);
});
