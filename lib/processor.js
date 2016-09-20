'use strict';

const execall = require('execall');
const splitLines = require('split-lines');
const _ = require('lodash');
const reindent = require('./reindent');

const sourceToLineMap = new Map();
const snippetRegexp = /(<script[\s\S]*?>)([\s\S]*?)<\/\s*?script>/g;

function preprocess(code, filepath) {
  const sourceMap = new Map();
  const extractedChunks = [];

  execall(snippetRegexp, code).forEach((match, chunkNumber) => {
    const chunkMap = new Map();
    sourceMap.set(chunkNumber, chunkMap);

    let currentExtractedCodeLine = 0;
    const openingTag = match.sub[0];
    const reindentData = reindent(match.sub[1]);

    chunkMap.set('indentColumns', reindentData.indentColumns);

    const bodyText = reindentData.text || '';

    const startLine = splitLines(code.slice(0, match.index + openingTag.length)).length;
    const linesWithin = splitLines(bodyText).length;

    for (let i = 0; i < linesWithin; i++) {
      currentExtractedCodeLine += 1;
      chunkMap.set(currentExtractedCodeLine, startLine + i);
    }

    const rightTrimmedBodyText = bodyText.replace(/\s*$/, '');

    extractedChunks.push(rightTrimmedBodyText);
  });

  sourceToLineMap.set(filepath, sourceMap);
  return extractedChunks;
}

function postprocess(messages, filepath) {
  const extractedToSourceLineMap = sourceToLineMap.get(filepath);
  messages.forEach((chunkMessages, chunkNumber) => {
    chunkMessages.forEach((message) => {
      if (!message.line) return;
      const chunkMap = extractedToSourceLineMap.get(chunkNumber);
      message.line = chunkMap.get(message.line);
      message.column = message.column + chunkMap.get('indentColumns');
    });
  });
  return _.flatten(messages);
}

module.exports = {
  preprocess,
  postprocess,
};
