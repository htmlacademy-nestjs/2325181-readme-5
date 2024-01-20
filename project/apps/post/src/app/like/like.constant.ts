export const LIKE_NOT_FOUND = 'The like has not been found';

export const POST_FOR_LIKE_NOT_FOUND = 'The post for like has not been found';

export const LikekValidationMessage = {
  PostId: {
    Required: 'Post id is required field',
    InvalidFormat: 'Post id should be a valid UUID value'
  },
  UserId: {
    Required: 'User id is required field',
    InvalidFormat: 'Post id should be a valid MongoId value'
  },
}
