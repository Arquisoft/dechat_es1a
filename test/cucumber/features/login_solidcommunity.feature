Feature: Login
  Everybody wants to login in dechat_es1a

  Scenario Outline: We are on the login page
    Given Solid Community ID provider and <user> and <password>
    When I try to log in
    Then I receive an answer from the app <result>

  Examples:
    | user            | password          | result  |
    | testerberme     | Tester_berme2019  | Ok      |
    | Sunday          | Nope              | Nope    |
    | anything else!  | Nope              | Nope    |
