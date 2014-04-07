# Words To Number

Converts Any numeric words (even mixed with actual numbers) to numbers

example: `one million 45 hundred 92` -> `1004592`;

if the conversion fails the output is `Nan`

## To Use:

Global:

```
WtoN.convert('one hundred and 42'); // => 142
```

CommonJS:

```
var WtoN = require('words-to-num');
```
