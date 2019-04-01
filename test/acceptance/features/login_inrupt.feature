Feature: Login Inrupt
  Scenario: We are on the login page an we try to login on inrupt
    When I am on the main page to login with Inrupt "http://localhost:4200/"
    And I select Inrupt ID provider and click on Go button

#  Examples:
#    | user            | password          | result  |
#    | testerberme     | Tester_berme2019  | Ok      |
#    | Sunday          | Nope              | Nope    |
#    | anything else!  | Nope              | Nope    |
