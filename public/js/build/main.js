!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.WtoN=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
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

},{}]},{},[1])
(1)
});