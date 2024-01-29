export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;

export const ApplicationServiceURL  = {
  Auth: 'http://localhost:5000/api/auth',
  User: 'http://localhost:5000/api/user',
  Post: 'http://localhost:7000/api/posts',
  Comment: 'http://localhost:7000/api/comments',
  Like: 'http://localhost:7000/api/likes',
  Upload: 'http://localhost:8000/api/upload'
} as const;

export const getAuthHeader = (req: Request) => ({
  headers: {
    'Authorization': req.headers['authorization']
  }
})
