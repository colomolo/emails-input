import { Email, VALID_EMAIL_CLASS } from './Email.js';

export class EmailsInput {
  constructor(rootEl, options = {}) {
    this.rootEl = rootEl;
    this.options = options;

    this.init();
    this.bindEvents();

    if (this.options.emails && this.options.emails.length > 0) {
      this.addEmails(this.options.emails);
    }
  }

  init() {
    this.createInput();
    this.rootEl.appendChild(this.boxEl);
  }

  bindEvents() {
    this.boxEl.addEventListener('click', this.focus.bind(this));

    this.inputEl.addEventListener('blur', this.parseCurrentInput.bind(this));
    this.inputEl.addEventListener('input', this.handleInput.bind(this));
    this.inputEl.addEventListener('keydown', this.handleKeyDown.bind(this))
    this.inputEl.addEventListener('paste', this.handlePaste.bind(this));
  }

  createInput() {
    this.boxEl = document.createElement('div');
    this.boxEl.className = 'ei-field';

    this.inputEl = document.createElement('input');
    this.inputEl.className = 'ei-input';
    this.inputEl.setAttribute('type', 'text');
    this.inputEl.setAttribute('placeholder', 'add more people...');

    this.boxEl.appendChild(this.inputEl);
  }

  focus() {
    this.inputEl.focus();
  }

  handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ',') {
      this.parseCurrentInput()
    }
  }

  parseCurrentInput() {
    this.addEmails(this.inputEl.value);
    this.inputEl.value = '';
  }

  handleInput(event) {
    const cleanInput = event.target.value.replace(/,/, '');
    this.inputEl.value = cleanInput;
  }

  handlePaste(event) {
    event.preventDefault();
    this.inputEl.value += event.clipboardData.getData('text');
    this.parseCurrentInput();
  }

  addEmails(emails) {
    let parsedEmails = [];

    if (typeof emails === 'string') {
      parsedEmails = emails.split(',');
    }

    if (Array.isArray(emails)) {
      parsedEmails = emails;
    }

    parsedEmails.forEach((email) => {
      const trimmedEmail = email.trim();

      if (trimmedEmail.length > 0) {
        const emailBlock = new Email(trimmedEmail, { pattern: this.options.validityPattern });
        this.boxEl.insertBefore(emailBlock, this.inputEl);
      }
    });
  }

  getCount() {
    return this.boxEl.querySelectorAll(`.${VALID_EMAIL_CLASS}`).length;
  }
}
