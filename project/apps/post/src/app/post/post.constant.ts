export const PostValidationParams = {
  Photo: {
    RegexURL: RegExp(/(.png$|.jpg$|.jpeg$)/i)
  },
  Tags: {
    MaximumCount: 8
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
    InvalidFormat: 'Post tags should be the array of string values',
    MaxSize: 'There should be not more than 8 tags in the list'
  },
  Photo: {
    Invalidformat: 'The photo file should have .jpg or .png format'
  },
  LinkURL: {
    InvalidFormat: 'The link URL should be a valid URL link'
  },
  VideoURL: {
    InvalidFormat: 'The video URL should be a valid URL link'
  },
  isRepost: {
    InvalidFormat: 'The isRepost status should be a boolean value'
  }
} as const;

export const POST_NOT_FOUND = 'The post has not been found';

export const POST_SEARCH_BY_TITLE_LIMIT = 20;
