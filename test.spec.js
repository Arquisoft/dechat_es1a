//test.spec.js
describe('Protractor Test', function() {  
  var addField = element(by.css('[placeholder="add new todo here"]'));  
  var checkedBox = element(by.model('todo.done'));  
  var addButton = element(by.css('[value="add"]'));  

  it('should navigate to the AngularJS homepage', function() {  
    browser.get('https://angularjs.org/'); //overrides baseURL  
  });  
});