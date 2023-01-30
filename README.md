# GiroCode

> A simple and tiny library for generating GiroCode (EPC QR code) strings

[![Coverage Status](https://coveralls.io/repos/github/rasshofer/girocode/badge.svg?branch=master)](https://coveralls.io/github/rasshofer/girocode?branch=master)

## Usage

```sh
npm install --save girocode
```

```ts
import giroCode from 'girocode';

const result = giroCode({
  name: 'Wikimedia',
  iban: 'DE33100205000001194700',
  bic: 'BFSWDE33BER',
  amount: 1.23,
});

if (result) {
  // Pipe `result` into your preferred QR code generator and do something with the resulting QR code
  console.log(result);
} else {
  // Something went wrong (e.g. invalid IBAN)
}
```

If you provide invalid data (e.g. an invalid IBAN or missing BIC if version 1 is used), the function will return `undefined`.

## Bring your own QR code generator

This package (intentionally) does not contain generating the actual QR code as this usually is highly dependent on the use-case, e.g. rendering a raster image vs. SVG vs. CLI/terminal vs. fancy/artistic codes. [https://www.npmjs.com/search?q=keywords:qr](https://www.npmjs.com/search?q=keywords:qr) provides a list of QR-code-related packages where you should be able to find a suiting library for your use-case. When creating the QR code, make sure that the error correction is at the »M«/medium level (i.e. resistance of 15%).

## Changelog

- 1.0.0
  - Initial version

## Roadmap

Potentially it could make sense to not only generate a GiroCode but also to parse one (into a JavaScript object) including proper validations? Maybe this gets added later, we’ll see.

## License

Copyright (c) 2023 [Thomas Rasshofer](https://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
