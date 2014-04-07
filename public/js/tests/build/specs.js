(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var WtoN = {
  units: {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90,
  },
  magnitudes: {
    'thousand': 1000,
    'million': 1000000,
    'billion': 1000000000,
    'trillion': 1000000000000
  },
  convert: function (words) {
    return this.compute(this.tokenize(words));
  },
  tokenize: function (words) {
    var array = words.split(' ');
    var result = [];
    array.forEach(function (string) {
      if ( ! isNaN(+string)) {
        result.push(+string);
      } else if (string == 'and') {
      } else {
        result.push(string);
      }
    });
    return result;
  },
  compute: function (tokens) {
    var result;
    var ins = this;
    var temp = 0;
    var sum = 0;
    result = tokens.forEach(function (token) {
      if (ins.units[token] != null) {
        sum += ins.units[token];
      } else if (token == 'hundred') {
        sum *= 100;
      } else if (! isNaN(token)) {
        sum += token;
      } else {
        mag = ins.magnitudes[token];
        temp += sum * mag;
        sum = 0;
      }
    });
    return temp + sum;
  }
};

module.exports = WtoN;

},{}],2:[function(require,module,exports){
var WtoN = require('../main');

describe("Tokenizing strings", function() {
  it("separate spaces to array", function() {
    var actual = WtoN.tokenize('one hundred');
    expect(actual).toEqual(['one', 'hundred']);
  });

  it ("can detect string numbers to numbers", function () {
    var actual = WtoN.tokenize('5 million 3453');
    expect(actual).toEqual([5, 'million', 3453]);
  });

  it ("can removed the word and from the array", function () {
    var actual = WtoN.tokenize('6 million and 52');
    expect(actual).toEqual([6, 'million', 52]);
  });
});

describe("Compute Numbers from tokenized array", function () {
  it("six million", function () {
    var actual = WtoN.compute(['six', 'million']);
    expect(actual).toEqual(6000000);
  });

  it("six million and 30", function () {
    var actual = WtoN.compute(['six', 'million', 30]);
    expect(actual).toEqual(6000030);
  });

  it("one hundred thousand", function () {
    var actual = WtoN.compute(['one', 'hundred', 'thousand']);
    expect(actual).toEqual(100000);
  });

  it("five thousand and 56", function () {
    expect(WtoN.compute(['five', 'thousand', 56])).toEqual(5056);
  });

  it("can parse one million two hundred thousand and five hundred fifty two", function () {
    var actual = WtoN.compute(['one', 'million', 'two', 'hundred', 'thousand', 'five', 'hundred','fifty', 'two']);
    expect(actual).toEqual(1200552);
  });

});

describe("converts words to number", function () {
  it("converts one million two hundred and fifty", function () {
    var actual = WtoN.convert("one million two hundred and fifty");
    expect(actual).toEqual(1000250);
  });
  it("converts one million 150 and nine", function () {
    var actual = WtoN.convert("one million 150 and nine");
    expect(actual).toEqual(1000159);
  });
});

},{"../main":1}]},{},[2])