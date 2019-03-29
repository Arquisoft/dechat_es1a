Feature: Login
  Everybody wants to login in dechat_es1a

  Scenario Outline: We are on the login page
    Given Inrupt ID provider
    When I login with <user> and <password> correctly
    Then I can enter to the app <result>

    Examples:
      | user            | password          | result  |
      | testerberme     | Tester_berme2019  | Ok      |
      | Sunday          | Nope              | Nop     |
      | anything else!  | Nope              | Nope    |
