'use strict';

const processor = require('./lib/processor');

module.exports = {
  processors: {
    '.html': processor,
    '.md': processor,
    '.jsp': processor,
    '.tag': processor,
  },
};
