import { PrismaClient } from '../../../../../node_modules/.prisma/client';
import { PostType} from '../../../app/types/src'

function getPosts () {
  return [
    {
      id: '751e27e32',
      type: PostType.Video,
      tags: ['film', 'drama', 'hit'],
      authorId: '896233844',
      isPublished: false,
      isRepost: true,
      originPostId: '123456781',
      originAuthorId: '787344956',
      createdAt: '2019-07-11T22:55:56.845Z',
      publishedAt: '2019-07-10T22:55:57.845Z',
      title: 'New video',
      videoURL: 'www.youtube.com'
    },
    {
      id: '672e27e32',
      type: PostType.Photo,
      tags: ['scene', 'field', 'autumn'],
      authorId: '987654321',
      isPublished: false,
      isRepost: false,
      originPostId: '',
      originAuthorId: '',
      createdAt: '2019-07-11T22:55:56.845Z',
      publishedAt: '2019-07-11T22:55:57.845Z',
      photo: 'New photo',
    },
  ]
}

const getContentPost = (data) => {
  switch (data.type) {
    case (PostType.Video):
      return {
        title: data?.title,
        videoURL: data?.videoURL,
      };
    case (PostType.Photo):
      return {
        photo: data?.photo,
      };
  }

}

function getComments () {
  return [
    {
      id: '639263582',
      text: 'Best Film I ever seen',
      postId: '751e27e32',
      userId: '1234556435'
    },
    {
      id: '584193722',
      text: 'beatiful photo.',
      postId: '672e27e32',
      userId: '9087453452'
    },
  ]
}

async function seedDb(prismaClient:PrismaClient) {
  const mockPosts = getPosts();
  const mockComments = getComments();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        type: post.type,
        tags: post.tags,
        authorId: post.authorId,
        isPublished: post.isPublished,
        isRepost: post.isRepost,
        originPostId: post.originPostId,
        originAuthorId: post.originAuthorId,
        createdAt: post.createdAt,
        publishedAt: post.publishedAt,
        ...getContentPost(post)
      }
    })
  }
  for (const comment of mockComments) {
    await prismaClient.comment.create({
      data: {
        id: comment.id,
        text: comment.text,
        postId: comment.postId,
        userId: comment.userId
      }
    })
  }
  console.info('Database has been filled');
}


async function bootstrap () {
  const prismaClient = new PrismaClient();
  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown){
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
