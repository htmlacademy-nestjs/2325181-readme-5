export function modifyLikesList<T>(postId: T,likes: T[]): T[] {
  const isPostInLikes = likes.includes(postId);
  isPostInLikes ?
  likes = likes.filter((like) => like !== postId) :
  likes.push(postId);
  return likes;
}
