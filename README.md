# @mapbox/eslint-plugin-script-tags

[![Build Status](https://travis-ci.com/mapbox/eslint-plugin-script-tags.svg?branch=main)](https://travis-ci.com/mapbox/eslint-plugin-script-tags)

An ESLint plugin that allows you to lint the content of `<script>` tags in arbitrary text.

Unlike [eslint-plugin-html](https://github.com/BenoitZugmeyer/eslint-plugin-html), which *parses* HTML to find `<script>`s, this plugin uses a regular expression.

The advantage of using a regular expression, and the reason this plugin exists, is that by avoiding a parser you can find and lint `<script>`s in arbitrary text — text that might not parse nicely as HTML, such as Markdown files with HTML fenced code blocks that contain `<script>`s. Like this (imagine the `'''`s are backticks):

```
Here is some *markdown*.

'''html
<div>
<script>
  // Here is JS you'd like to lint!
  var a = "foo";
</script>
'''
```

(If you want to lint JS fenced code blocks, use [eslint-plugin-markdown](https://github.com/eslint/eslint-plugin-markdown)).

The disadvantage of using a regular expression, of course, is that it's not as robust as a real parser. If your `<script>` is within a comment, for example, it will still be linted: the regular expression doesn't know about the comment. You might like that, or you might not.

## Usage

Use this module like any other [ESLint plugin](http://eslint.org/docs/user-guide/configuring#configuring-plugins).

Unfortunately, we do need to provide a finite list of file extensions to check. Here's the current list:

- `.html`
- `.htm`
- `.md`
- `.jsp`
- `.tag`
- `.hbs`
- `.ejs`
- `.php`
- `.vue`
- `.erb`
- `.liquid`
- `.cfm`

There's no reason not to add more: so if you'd like another, please PR!

## Caveats

### Indentation

Expected indentation (if you use the `indent` rule) is determined by the first line of code. This can get hairy if you do something sloppy like:

```html
<script>var a = 'foo';
  var b = 'bar';
</script>
```

So I wouldn't do that.

### Arbitrary tags

Ideally this module could allow you to arbitrarily modify the expected tags regular expression, from `<script>...</script>` to something like `{% highlight js %}...{% endhighlight %}` or `[javascript-block]...[end javascript-block]`, etc. However, to do so would require adding *options*, and it doesn't seem that ESLint's built options into the processor API. If you would like this feature and want to work on adding options, your help would be welcome.
