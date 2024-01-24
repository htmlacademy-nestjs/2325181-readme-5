export interface Subscriber {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  newPostsUpdate?: Date;
  followUp?: string[];
}
