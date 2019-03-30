Feature: Load Friends
  If I enter to the chat I want to see my friends who I can talk to

  Scenario Outline: We are on the main page of the app
    Given We are on the card page of the app "http://localhost:4200/card"
    When I click on chat tab
    Then I can see <friends> on the list

  Examples:
    | user        | friends |
    | berme       | 3       |
    | testerBerme | 0       |
