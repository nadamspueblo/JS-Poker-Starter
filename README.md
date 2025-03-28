![JS Poker](http://img.mdp.im.s3.amazonaws.com/2013m19Untitled_83t55f.jpg)

# JS Pokerbot Competition

A No-limit Texas Hold'em poker tournament for Javascript bots.

## Introduction

JsPoker is an automated poker competition, where your opponents are bots written in Javascript.
At the moment they are each quite unintelligent/unimaginative. The challenge is to
write a competitor in JS that can handily beat them all over the course of 50 tournaments,
each with a maximum of 500 hands.

## How to play

1. Clone this repo
1. Modify the existing [challenger bot](players/challengerBot.js)
1. Tune it to maximize winnings

## Rules

1. The game is No-limit Texas Hold'em ($10-20), with each player starting with $1000
1. Only one file may be modified 'players/challengerBot.js' 
1. Bots must win through legitimate poker play. Hacking is fine, but the bounty will only be paid to legitimate winners. Think of it this way, if your bot was in a casino, would it get kicked out or arrested?
2. You may use the ```pokerbot-helper``` package for some useful tools to help build a pokerbot

## Installation

1. Clone this repository
2. _Optional_ run ```npm install pokerbot-helper``` from the command-line in VS Code to install the pokerbot helper package ([See documentation](https://github.com/nadamspueblo/PokerBotHelper))

### Building a better poker bot

Test your bot simply by running the command ```node index.js``` from the VS Code command-line. 

The output will include each bots betting actions and cards held in order
to make tuning and debugging easier.

Modify the number of hands tested in ```index.js```

#### Game data and bot actions

Bots are handed a game data object with the current state of the game and simply have
to return a wager as an integer.

#### Game data

Here's an example game date payload: [GameData.json](https://gist.github.com/mdp/050cd82f651eb9f9b9c8)

Game object consists of 6 properties:

- `self` Your bots current standing/cards
- `hand` The current number hand being played
- `state` The betting state of the game. Ex. 'river'
- `betting` Betting options available - These are incremental wager options
- `players` Array of each player, their actions for any round, and wager/stack
- `community` Community cards

**I recommend printing out the ```game``` object to the console so you can see how it is structured and what data is available**

#### Bot Actions

In Texas Hold'em, you're only real options are to stay in the game, or fold. With that in mind
bots only need to return an integer representing the additional amount they wish to
add to the pot.

The game objects `betting` property shows the betting options available to the player/bot. `call`
represents the additional amount needed to stay in the game, while `raise` represents the minimum amount
a player can bet if they wish to raise.

- Wagers of less than the amount required to call are considered a 'fold'
- Wagers of '0', when the call amount is '0', are considered a check.
- Wagers greater than the call, but less than the minimum raise will result in a call
- A negative wager will force a fold.
- Failure to return an integer will assume a wager of '0', which may in turn result in a fold

#### Example players

Here's an extremely simple bot that only raises each betting round:

    // I only raise!
    module.exports = function () {
      var info = {
        name: "RaiseBot"
      };
      function play(game) {
        if (game.state !== "complete") {
          return game.betting.raise;
        }
      }

      return { play: play, info: info }
    }

Take a look at the code for the current set of players. 

### Resources

- [Texas Hold'em Wikipedia](http://en.wikipedia.org/wiki/Texas_hold_'em)
- Poker code and depenencies
  - [MachinePoker](https://github.com/mdp/MachinePoker) runs this competition
  - [Binions](https://github.com/mdp/binions) is the core code for playing Texas Hold'em
  - [Hoyle](https://github.com/mdp/hoyle) is the card/hand evaluator code
- #machinepoker on Freenode

### Requirements

- Node.js >= 0.10
- an 80386sx microprocessor or better with at least 8 MB of RAM
- OSx, Ubuntu, BSD, or some other POSIX compatible file system. (I don't have a windows machine to test with. Happy to take PR's to fix this)
