Feature: Register
 Scenario: should navigate to the main page
   When I navigate to "http://localhost:4200/"
   Then the title should be "SolidApp"

#Scenario: should be able to see the Login page
   When I navigate to "http://localhost:4200/"
   When I click the Register button
   Then I should see a "Select Solid Identity Provider" title
