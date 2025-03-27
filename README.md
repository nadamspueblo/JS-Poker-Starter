![JS Poker](http://img.mdp.im.s3.amazonaws.com/2013m19Untitled_83t55f.jpg)

# JS Poker

A No-limit Texas Hold'em poker tournament for Javascript bots played via pull requests with Travis CI as the dealer.

## Introduction

JsPoker is an automated poker competition, where your opponents are bots written in Javascript.
At the moment they are each quite unintelligent/unimaginative. The challenge is to
write a competitor in JS that can handily beat them all over the course of 50 tournaments,
each with a maximum of 500 hands.

_Example_:

Each bot starts with $1000 for every tournament, regardless of past performance. It must play 50 tournaments against the other bots. Therefore the bot is putting up $50k in total in the tournaments and needs to see a return of $100k if the challenge is 2x. This may seem hard, but keep in mind that over the course of 50 tournaments, the other bots are putting $300k into the pot, you only need to take 1/3 of this.

If you win, your bot will be added to the table to play future bots.

## Why

Like many people, I like to play poker and lose money. The obvious next step was to automate this.


## How to play

1. Clone this repo and run 'npm install'
1. Modify the existing [challenger bot](players/challengerBot.js)
1. Tune it to double your money over the course of 25,000 hands (50 Tournaments of 500 hands each)

## Rules

1. The game is No-limit Texas Hold'em ($10-20), with each player starting with $1000
1. Only one file may be modified 'players/challengerBot.js' 
1. You cannot load any modules. This includes Node.js core modules (fs, http, etc.)
1. Source code may not be obsfuscated/minified. Everyone should be able to learn from your winning bot.
1. Bots must win through legitimate poker play. Hacking is fine, but the bounty will only be paid to legitimate winners. Think of it this way, if your bot was in a casino, would it get kicked out or arrested?

## Installation

    # Requires NodeJs >= 0.10.0
    git clone https://github.com/mdp/JsPoker.git
    cd JsPoker
    npm install
    npm test
    # Now go and turn your bot into a champion!

### Building a better poker bot

You can test out your bot simply by pressing the run button. Modify the number of hands tested in index.js

The output will include each bots betting actions and cards held in order
to make tuning and debugging easier.

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
