export const AUTH_USER_EXISTS = 'User with email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';
export const USERNAME_FIELD = 'email';

export const UserValidationParams = {
  Avatar: {
    RegexURL: RegExp(/(.png$|.jpg$|.jpeg$)/i)
  },
  Firstname: {
    Length: {
      Minimal: 3,
      Maximal: 50
    }
  },
  Lastname: {
    Length: {
      Minimal: 3,
      Maximal: 50
    }
  },
  Password: {
    Length: {
      Minimal: 6,
      Maximal: 12
    }
  }
} as const;

export const UserValidationMessage = {
  Avatar: {
    InvalidFormat: 'User avatar should be a jpg or png file of not more than 500 kbyte size'
  },
  Email: {
    InvalidFormat: 'User e-mail should have format user@domain.com'
  },
  Firstname: {
    InvalidFormat: 'User firstname should have a string format',
    InvalidLength: 'User firstname should have a minimal length of 3 letters, maximal length of 50 letters'
  },
  Lastname: {
    InvalidFormat: 'User lastname should have a string format',
    InvalidLength: 'User lastname should have a minimal length of 3 letters, maximal length of 50 letters'
  },
  Password: {
    InvalidLength: 'User e-mail should have a string format',
    InvalidPassword: 'User password should have a minimal length of 6 letters, maximal length of 12 letters'
  }
} as const;
