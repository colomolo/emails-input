# Emails-input
[Demo page](https://colomolo.github.io/emails-input/demo/index.html)

## Usage
Add `js` and `css` files from `dist` folder to your page:
```html
<link rel="stylesheet" type="text/css" href="css/emails-input.min.css"/>
<script src="js/emails-input.min.js"></script>
```

Use `EmailsInput` constructor to init input field on DOM element:
```html
<div id="emails-input"></div>
```
```javascript
var inputContainerNode = document.querySelector('#emails-input');
var emailsInput = new EmailsInput(inputContainerNode);
```

You can also pass options object to constructor as a second argument:
```javascript
var options = {
  emails: ['john@smith.com', 'admin@example.com'],
  validityPattern: /.+@.+\..+/i,
};
var emailsInput = new EmailsInput(inputContainerNode, options);
```

### Options
**emails**`: string | string[] = []`\
Add initial list of emails as a string separated with commas or as an array of strings.

**validityPattern**`: RegExp = /.+@.+\..+/i`\
Pattern for email validity check. Default pattern is intentionally pretty straightforward. You can specify more strict pattern, for example [RFC 5322 compliant](http://emailregex.com/) one.

### Instance methods
**addEmails**(emails`: string | string[]`)`: void`\
Add emails.

**getCount**()`: number`\
Get count of valid emails currently poresent in emails field.

## Development
Run `yarn run watch` command to get into Webpack watch mode. Webpack will track changes in source files and rebuild them in `dist` folder on each change.

You can check results on [demo page](https://colomolo.github.io/emails-input/demo/index.html) - it looks into `dist` folder.

## Tests
Run `yarn run test`.
