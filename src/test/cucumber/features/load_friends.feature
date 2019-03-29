Feature: Load Friends
  If I enter to the chat I want to see my friends who I can talk to

  Scenario Outline: We are on the chat page
    Given Access to dechat_es1a as <user>
    When I click on chat tab
    Then I can see <friends> on the list

  Examples:
    | user        | friends |
    | berme       | 3       |
    | testerBerme | 0       |
