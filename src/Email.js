import removeIcon from './remove.svg';

const DEFAULT_EMAIL_PATTERN = /.+@.+\..+/i;
export const VALID_EMAIL_CLASS = 'ei-email_valid';
export const INVALID_EMAIL_CLASS = 'ei-email_invalid';
export const DELETE_CLASS = 'ei-email__delete';

export class Email {
  constructor(email, options = {}) {
    this.email = email;
    this.pattern = options.pattern || DEFAULT_EMAIL_PATTERN;

    this.init();
    this.bindEvents();

    return this.blockEl;
  }

  init() {
    this.blockEl = document.createElement('div');
    this.blockEl.className = `ei-email ${this.isValid() ? VALID_EMAIL_CLASS : INVALID_EMAIL_CLASS}`;
    this.blockEl.innerText = this.email;

    this.crossEl = document.createElement('div');
    this.crossEl.className = DELETE_CLASS;
    this.crossEl.innerHTML = removeIcon;

    this.blockEl.appendChild(this.crossEl);
  }

  bindEvents() {
    this.crossEl.addEventListener('click', this.delete.bind(this));
  }

  delete(event) {
    this.blockEl.parentNode.removeChild(this.blockEl);
  }

  isValid() {
    return this.pattern.test(this.email);
  }
}
