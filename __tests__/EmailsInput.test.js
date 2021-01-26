import { EmailsInput } from '../src/EmailsInput.js';
import { VALID_EMAIL_CLASS, INVALID_EMAIL_CLASS } from '../src/Email.js';

describe('EmailsInput', () => {
  describe('API', () => {
    let root;
    let emailsInput;

    beforeEach(() => {
      root = document.createElement('div');
      const options = {
        emails: ['test@test.com'],
        validityPattern: /.@test\.com/i,
      };
      emailsInput = new EmailsInput(root, options);
    });

    it('adds valid email from string', () => {
      emailsInput.addEmails('new@test.com');

      const validEmails = root.querySelectorAll(`.${VALID_EMAIL_CLASS}`);

      expect(validEmails[1].innerText).toBe('new@test.com');
    });

    it('adds invalid email from string', () => {
      emailsInput.addEmails('newtest.com');

      const invalidEmails = root.querySelectorAll(`.${INVALID_EMAIL_CLASS}`);

      expect(invalidEmails[0].innerText).toBe('newtest.com');
    });

    it('adds emails separated by commas', () => {
      emailsInput.addEmails('new@test.com, another@test.com, onemore@test.com');

      const validEmails = root.querySelectorAll(`.${VALID_EMAIL_CLASS}`);

      expect(validEmails.length).toBe(4);
    });

    it('adds valid emails from array', () => {
      emailsInput.addEmails(['another@test.com', 'onemore@test.com']);

      const validEmails = root.querySelectorAll(`.${VALID_EMAIL_CLASS}`);

      expect(validEmails[1].innerText).toBe('another@test.com');
      expect(validEmails[2].innerText).toBe('onemore@test.com');
    });

    it('counts valid emails correctly', () => {
      emailsInput.addEmails(['another@test.com', 'onemore@test.com', 'foo', 'bar']);
      expect(emailsInput.getCount()).toBe(3);
    });

    it('uses validityPattern param to check validity', () => {
      emailsInput.addEmails('invalid@example.com');
      expect(emailsInput.getCount()).toBe(1);
    });
  });

  describe('', () => {

  });
});
