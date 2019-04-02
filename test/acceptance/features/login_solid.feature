Feature: Login Solid Community
  Scenario: We are on the login page an we try to login on solid community
    When I am on the main page to login with Solid Community "http://localhost:4200/"
      And I select Solid Community ID provider and click on Go button
#    Then I am on the page "https://solid.community/login?scope=openid&client_id=b8cda09f91d2a3e60359ac2aa158c6b3&response_type=id_token%20token&request=eyJhbGciOiJub25lIn0.eyJyZWRpcmVjdF91cmkiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvY2FyZCIsImRpc3BsYXkiOiJwYWdlIiwibm9uY2UiOiJtbTJsSG1qOEtQc2lpZFRvQzI0NUlRVnFzelMxZzFOcDFhZEg3Z1dEOWNVIiwia2V5Ijp7ImFsZyI6IlJTMjU2IiwiZSI6IkFRQUIiLCJleHQiOnRydWUsImtleV9vcHMiOlsidmVyaWZ5Il0sImt0eSI6IlJTQSIsIm4iOiIyZU1hNVhMR09CZ0RMRGhWTU5reWJRSUp0dG1qSXZSZU5vblhIaEwybnR1S0pvQXlSTERFSmp3WE9UZW5VOU85b251aHlNamUyUU9Vc3NJcjdUQlRyZ2lsb0Rhc1hqdnBnVHgzSTBIdVhZWV9iN2hSd2pBM0puS19mTTVNZDRSTC1ORGJ5R2FVNWI3U09vR3dRRUFQU0ExTDdnVUt0M2h4bjY2bFNzV09ldjNCRTNSY05rTU1nU21EQ0Z5azNqWm9heDFxaWxqX0VQQlFwTHBpTFhTNmpNRk9IWi14MlVfN0d2ZUJUTm5UZ1pYVXpsVVpzcmxXdU1vM18tb3FUcUhQS1YxekQ4T3VJalBIZF90anZ2a1dBdWZNQ2FUMVJIcGJDNDVuRWp2dk9iY3REUjQ5dnFaTmg1VUtROGJTU2NHMl9YVkVWWGU0UDRFX2dNc1lyMjBERncifX0.&state=6-ljGXx81OjgBg6bN4pZYCJE4TijSyRta4pDTr6sAGw"

#  Examples:
#    | user            | password          | result  |
#    | testerberme     | Tester_berme2019  | Ok      |
#    | Sunday          | Nope              | Nope    |
#    | anything else!  | Nope              | Nope    |
