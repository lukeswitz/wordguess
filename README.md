<div align="left">
  <a href="https://lukeswitz.github.io/wordguess/" ><img src="https://github.com/lukeswitz/wordguess/workflows/Publish/badge.svg?branch=main" alt="Publish workflow"/></a>
  <img src="https://img.shields.io/github/package-json/v/lukeswitz/wordguess" alt="GitHub package.json version" />
</div>

### Additional Features

- Words are chosen from the list of words at random instead of in sequence, and the solution is not stored in localStorage, making it harder to cheat. The seed for the random number is created from the date, ensuring that everyone gets the same random number, so people can still compare answers for daily & hourly games.
- When you complete a game the definition of the word is shown on the end of game modal.
- In addition to the other statistics, your average guesses and your losses are also displayed.
- When the timer reaches 0 for a given game mode it changes into a refresh button instead of staying at 00:00:00.
- When the timer reaches 0 for a given game mode a refresh button appears in the top left corner.
- A tips widget in the settings menu with useful information about the functionality of the game.
- Right clicking/double tapping a submitted word on the board will tell you its definition.
- Right clicking/double tapping a submitted word on the board will tell you how many possible words could have been played there, taking all previous information into account.
- Right clicking/double tapping the row below the last submitted word will tell you how many possibilities there are taking all previous information into account.
- The game mode is reflected in the url, allowing you to share a game mode directly.
- Service worker which allows the game to be easily downloaded as a progressive web app and run offline.
- Give Up button.

## Additional modes
**Hourly mode**: A new word every hour.

**Infinite mode**: A new word every time you refresh, for the true addicts.

##### Credit to @MikhaD for the original repository, thank you.

<details>
<summary>To do</summary>

# To Do
- Fix nonsense with timings & delay variable
- Tidy up animation code and make animation mechanism consistant (if possible)
- Look into improving the performance
</details>
