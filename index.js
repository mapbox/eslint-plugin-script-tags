'use strict';

const processor = require('./lib/processor');

module.exports = {
  processors: {
    '.html': processor,
    '.htm': processor,
    '.md': processor,
    '.jsp': processor,
    '.tag': processor,
    '.hbs': processor,
    '.ejs': processor,
    '.php': processor,
    '.vue': processor,
    '.erb': processor,
  },
};
