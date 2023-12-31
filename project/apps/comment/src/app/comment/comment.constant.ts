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
  }
} as const;

export const COMMENT_NOT_FOUND = 'The comment doesn\'t exist';
