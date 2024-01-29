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
  AuthorId: {
    InvalidFormat: 'Author id should be valid mongo id'
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
    InvalidLength: 'User password should have a minimal length of 6 letters, maximal length of 12 letters',
    InvalidPassword: 'User password should be a string value'
  }
} as const;

export const PostValidationParams = {
  Photo: {
    RegexURL: RegExp(/(.png$|.jpg$|.jpeg$)/i)
  },
  Tags: {
    MaximumCount: 8,
    Length: {
      Minimum: 3,
      Maximum: 10
    },
    RegExp: RegExp(/^\D\S*$/i)
  },
  Creator: {
    Length: {
      Minimum: 3,
      Maximum: 50
    }
  },
  CiteText: {
    Length: {
      Minimum: 20,
      Maximum: 300
    }
  },
  Announce: {
    Length: {
      Minimum: 50,
      Maximum: 255
    }
  },
  Text: {
    Length: {
      Minimum: 100,
      Maximum: 1024
    }
  },
  Title: {
    Length: {
      Minimum: 20,
      Maximum: 50
    }
  },
  LinkDescription: {
    MaximumLength: 300
  },
} as const;

export const PostValidationMessage = {
  AuthorId: {
    InvalidFormat: 'Author id should be valid mongo id'
  },
  Creator: {
    InvalidFormat: 'Cite creator should have a string format',
    InvalidLength: 'Cite creator should have a minimum length of 3 letters, maximum length of 50 letters'
  },
  CiteText: {
    InvalidFormat: 'Cite text should have a string format',
    InvalidLength: 'Cite text should have a minimum length of 20 letters, maximum length of 300 letters'
  },
  Title: {
    InvalidFormat: 'Post title should have a string format',
    InvalidLength: 'Post title should have a minimum length of 20 letters, maximum length of 50 letters'
  },
  Announce: {
    InvalidFormat: 'Announce text should have a string format',
    InvalidLength: 'Announce text should have a minimum length of 50 letters, maximum length of 255 letters'
  },
  Text: {
    InvalidFormat: 'Post text should have a string format',
    InvalidLength: 'Post text should have a minimum length of 100 letters, maximum length of 1024 letters'
  },
  LinkDescription: {
    InvalidFormat: 'Link description should have a string format',
    InvalidLength: 'Link description should have a maximum length of 300 letters'
  },
  Type: {
    InvalidFormat: 'Post type should have one of the following values: video, photo, cite, link, text'
  },
  Tags: {
    InvalidFormat: 'Post tags should be the array of string values. Each tag should start with letter, no whitespaces allowed',
    InvalidLength: 'Each tag should take at least 3 and maximum 10 signs',
    MaxSize: 'There should be not more than 8 tags in the list'
  },
  Photo: {
    InvalidFormat: 'The photo file should have .jpg or .png format'
  },
  LinkURL: {
    InvalidFormat: 'The link URL should be a valid URL link'
  },
  VideoURL: {
    InvalidFormat: 'The video URL should be a valid URL link'
  },
  isPublished: {
    InvalidFormat: 'The publishing status should be a boolean value'
  }
} as const;

export const CommentValidationParams = {
  Text: {
    Length: {
      Minimal: 10,
      Maximal: 300
    }
  },
} as const;

export const CommentValidationMessage = {
  Text: {
    InvalidFormat: 'Comment text should have a string format',
    InvalidLength: 'Comment text should have a minimal length of 10 letters, maximal length of 300 letters'
  },
  PostId: {
    InvalidFormat: 'Post Id should have a string format (UUID)',
  }
} as const;
