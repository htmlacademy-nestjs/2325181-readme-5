export function modifyLikesList<T>(postId: T,likesList: T[]): T[] {
  const isPostInLikesList = likesList.includes(postId);
  isPostInLikesList ?
  likesList = likesList.filter((like) => like !== postId) :
  likesList.push(postId);
  return likesList;
}
