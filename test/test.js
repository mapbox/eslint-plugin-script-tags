'use strict';

const test = require('tap').test;
const CLIEngine = require('eslint').CLIEngine;
const fs = require('fs');
const path = require('path');
const plugin = require('..');

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, `./fixtures/${name}`), 'utf8');
}

function createCliEngine() {
  const cli = new CLIEngine({
    extensions: ['*'],
    useEslintrc: false,
    rules: {
      quotes: [2, 'single'],
      indent: [2],
    },
  });
  cli.addPlugin('script-tags', plugin);
  return cli;
}

test('html', (assert) => {
  const code = fixture('html.html');
  const cli = createCliEngine();
  const report = cli.executeOnText(code, 'html.html');
  const messages = report.results[0].messages;

  assert.deepEqual(messages[0][0].ruleId, 'indent');
  assert.deepEqual(messages[0][0].line, 9);
  assert.deepEqual(messages[0][0].column, 7);
  assert.deepEqual(messages[0][1].ruleId, 'quotes');
  assert.deepEqual(messages[0][1].line, 9);
  assert.deepEqual(messages[0][1].column, 15);

  assert.deepEqual(messages[1][0].ruleId, 'indent');
  assert.deepEqual(messages[1][0].line, 16);
  assert.deepEqual(messages[1][0].column, 5);
  assert.deepEqual(messages[1][1].ruleId, 'quotes');
  assert.deepEqual(messages[1][1].line, 16);
  assert.deepEqual(messages[1][1].column, 13);

  assert.end();
});

test('markdown', (assert) => {
  const code = fixture('markdown.md');
  const cli = createCliEngine();
  const report = cli.executeOnText(code, 'markdown.md');
  const messages = report.results[0].messages;

  assert.deepEqual(messages[0][0].ruleId, 'indent');
  assert.deepEqual(messages[0][0].line, 12);
  assert.deepEqual(messages[0][0].column, 3);
  assert.deepEqual(messages[0][1].ruleId, 'quotes');
  assert.deepEqual(messages[0][1].line, 12);
  assert.deepEqual(messages[0][1].column, 11);

  assert.deepEqual(messages[1][0].ruleId, 'indent');
  assert.deepEqual(messages[1][0].line, 19);
  assert.deepEqual(messages[1][0].column, 7);
  assert.deepEqual(messages[1][1].ruleId, 'quotes');
  assert.deepEqual(messages[1][1].line, 19);
  assert.deepEqual(messages[1][1].column, 15);

  assert.end();
});
