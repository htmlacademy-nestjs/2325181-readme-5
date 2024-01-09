-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('video', 'text', 'quote', 'photo', 'link');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "type" "PostType" NOT NULL,
    "is_repost" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "user_id" TEXT NOT NULL,
    "content_id" TEXT NOT NULL,
    "origin_post_id" TEXT NOT NULL DEFAULT '',
    "origin_author_id" TEXT NOT NULL DEFAULT '',
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creator" TEXT DEFAULT '',
    "citeText" TEXT DEFAULT '',
    "linkURL" TEXT DEFAULT '',
    "linkDescription" TEXT DEFAULT '',
    "photo" TEXT DEFAULT '',
    "text" TEXT DEFAULT '',
    "title" TEXT DEFAULT '',
    "announce" TEXT DEFAULT '',
    "videoURL" TEXT DEFAULT '',

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
