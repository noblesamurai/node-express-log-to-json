# express-request-to-json [![Build Status](https://travis-ci.org/noblesamurai/node-express-request-to-json.svg?branch=master)](http://travis-ci.org/noblesamurai/node-express-request-to-json) [![NPM version](https://badge-me.herokuapp.com/api/npm/express-request-to-json.png)](http://badges.enytc.com/for/npm/express-request-to-json)

> Filter out useless noise from an express req before logging.

## Purpose

A simple function to filter express.req before logging it.  Does a shallow clone.

## Usage

```js
let filter = require('express-request-to-json');
app.use('/default', (req, res) => {
  const result = filter(req);
  // Result returns only the default whitelisted key values.
});

app.use('/extra', (req, res) => {
  const extra = [
    'video', // The whole video object
    ['headers', ['x-id', 'x-fubar']] // The 'x-id' and 'x-fubar' keys in the header object
  ];
  const result = filter(req, extra);
  // Result returns only the default whitelisted key values as well as the
  // extra passed in key values.
});
```

## Installation

This module is installed via npm:

``` bash
$ npm install express-request-to-json
```

## License

The BSD License

Copyright (c) 2017, Tim Allen

All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this
  list of conditions and the following disclaimer in the documentation and/or
  other materials provided with the distribution.

* Neither the name of the Tim Allen nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

