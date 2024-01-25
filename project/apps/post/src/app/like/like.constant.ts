export const LIKE_NOT_FOUND = 'The like has not been found';

export const USER_UNAUTHORIZED = 'User may not add/remove another like for single post';

export const USER_FORBIDDEN = 'User may not add/remove like for not published posts';

export const LikekValidationMessage = {
  PostId: {
    Required: 'Post id is required field',
    InvalidFormat: 'Post id should be a valid UUID value'
  },
  UserId: {
    Required: 'User id is required field',
    InvalidFormat: 'User id should be a valid MongoId value'
  },
}
