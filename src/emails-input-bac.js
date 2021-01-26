import removeIcon from 'remove.svg';

var EMAIL_PATTERN = /.+@.+\..+/i;

function EmailsInput(root, options = {}) {
  this.rootEl = root;
  this.options = options;

  this.init();
  this.bindEvents();
}

EmailsInput.prototype.createInput = function() {
  this.boxEl = document.createElement('div');
  this.boxEl.className = 'ei-field';

  this.inputEl = document.createElement('input');
  this.inputEl.className = 'ei-input';
  this.inputEl.setAttribute('type', 'text');
  this.inputEl.setAttribute('placeholder', 'add more people...');

  this.boxEl.appendChild(this.inputEl);
}

EmailsInput.prototype.init = function() {
  this.createInput();
  this.rootEl.appendChild(this.boxEl);
}

EmailsInput.prototype.bindEvents = function() {
  this.boxEl.addEventListener('click', this.focus.bind(this));

  this.inputEl.addEventListener('blur', this.parseCurrentInput.bind(this));
  this.inputEl.addEventListener('input', this.handleInput.bind(this));
  this.inputEl.addEventListener('keydown', this.handleKeyDown.bind(this))
  this.inputEl.addEventListener('paste', this.handlePaste.bind(this));
}

EmailsInput.prototype.focus = function() {
  this.inputEl.focus();
}

EmailsInput.prototype.handleKeyDown = function(event) {
  if (event.key === 'Enter' || event.key === ',') {
    this.parseCurrentInput()
  }
}

EmailsInput.prototype.parseCurrentInput = function() {
  this.inputEl.value.split(',').forEach(function(email) {
    this.addEmail(email);
  }, this);

  this.inputEl.value = '';
}

EmailsInput.prototype.handleInput = function(event) {
  var cleanInput = event.target.value.replace(/,/, '');

  this.inputEl.value = cleanInput;
}

EmailsInput.prototype.handlePaste = function(event) {
  event.preventDefault();
  this.inputEl.value += event.clipboardData.getData('text');
  this.parseCurrentInput();
}

EmailsInput.prototype.addEmail = function(email) {
  var trimmedEmail = email.trim();

  if (trimmedEmail.length > 0) {
    var emailBlock = new Email(email);
    this.boxEl.insertBefore(emailBlock, this.inputEl);
  }
}

EmailsInput.prototype.getCount = function() {

}

function Email(email) {
  this.email = email;

  this.init();
  this.bindEvents();

  return this.blockEl;
}

Email.prototype.init = function() {
  this.blockEl = document.createElement('div');

  if (this.isValid()) {
    this.blockEl.className = 'ei-email ei-email_valid';
  } else {
    this.blockEl.className = 'ei-email ei-email_invalid';
  }

  this.blockEl.innerText = this.email;

  this.crossEl = document.createElement('div');
  this.crossEl.className = 'ei-email__delete';
  this.crossEl.innerHtml = removeIcon;

  this.blockEl.append(this.crossEl);
}

Email.prototype.bindEvents = function() {
  this.crossEl.addEventListener('click', this.delete.bind(this));
}

Email.prototype.delete = function(event) {
  this.blockEl.remove();
}

Email.prototype.isValid = function() {
  return EMAIL_PATTERN.test(this.email);
}
