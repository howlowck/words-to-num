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
