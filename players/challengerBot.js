module.exports = function () {

  var info = {
    name: "ChallengerBot",
    email: "",
    btcWallet: ""
  };

  /*
    Modify the update() function with your code
    The update function *must* return the amount you wish to bet. 
    If you return less than the minimum required to call, your bot will fold
  */
  function update(game) {
    if (game.state !== "complete") {
      return game.betting.call;
    }
  }

  return { update: update, info: info }

}
