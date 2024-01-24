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

export const COMMENT_NOT_FOUND = 'The comment doesn\'t exist';

export const POST_FOR_COMMENT_NOT_FOUND = 'The related post for comment not found';

export const USER_UNAUTHORIZED = 'User may delete only own comments';

export const COMMENT_LIST_REUQEST_COUNT = 50;

export const DEFAULT_PAGE_NUMBER = 1;
