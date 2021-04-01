'use strict';

const test = require('tap').test;
const { ESLint } = require('eslint');
const fs = require('fs');
const path = require('path');
const plugin = require('..');

function fixture(name) {
  return fs.readFileSync(path.join(__dirname, `./fixtures/${name}`), 'utf8');
}

function createCliEngine() {
  const cli = new ESLint({
    extensions: ['*'],
    useEslintrc: false,
    overrideConfig: {
      rules: {
        quotes: [2, 'single'],
        indent: [2]
      },
      plugins: ['script-tags']
    },
    plugins: {
      'script-tags': plugin
    }
  });
  return cli;
}

test('html', async (assert) => {
  const code = fixture('html.html');
  const cli = createCliEngine();
  const report = await cli.lintText(code, {
    filePath: './fixtures/html.html'
  });
  const messages = report[0].messages;

  assert.deepEqual(messages[0].ruleId, 'indent');
  assert.deepEqual(messages[0].line, 9);
  assert.deepEqual(messages[0].column, 5);
  assert.deepEqual(messages[1].ruleId, 'quotes');
  assert.deepEqual(messages[1].line, 9);
  assert.deepEqual(messages[1].column, 15);

  assert.deepEqual(messages[2].ruleId, 'indent');
  assert.deepEqual(messages[2].line, 16);
  assert.deepEqual(messages[2].column, 3);
  assert.deepEqual(messages[3].ruleId, 'quotes');
  assert.deepEqual(messages[3].line, 16);
  assert.deepEqual(messages[3].column, 13);

  assert.end();
});

test('markdown', async (assert) => {
  const code = fixture('markdown.md');
  const cli = createCliEngine();
  const report = await cli.lintText(code, {
    filePath: './fixtures/markdown.md'
  });

  const messages = report[0].messages;

  assert.deepEqual(messages[0].ruleId, 'indent');
  assert.deepEqual(messages[0].line, 12);
  assert.deepEqual(messages[0].column, 1);
  assert.deepEqual(messages[1].ruleId, 'quotes');
  assert.deepEqual(messages[1].line, 12);
  assert.deepEqual(messages[1].column, 11);

  assert.deepEqual(messages[2].ruleId, 'indent');
  assert.deepEqual(messages[2].line, 19);
  assert.deepEqual(messages[2].column, 5);
  assert.deepEqual(messages[3].ruleId, 'quotes');
  assert.deepEqual(messages[3].line, 19);
  assert.deepEqual(messages[3].column, 15);

  assert.end();
});
