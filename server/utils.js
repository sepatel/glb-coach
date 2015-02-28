module.exports = {
  randomInt: function(min, max) {
    if (max === undefined) {
      max = min;
      min = 1;
    }

    return Math.floor(Math.random() * (max - min)) + min;
  }
};
