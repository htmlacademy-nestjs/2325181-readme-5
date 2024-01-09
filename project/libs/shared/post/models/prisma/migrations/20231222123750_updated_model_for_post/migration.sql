/*
  Warnings:

  - You are about to drop the column `citeText` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `linkDescription` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `linkURL` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `videoURL` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "citeText",
DROP COLUMN "linkDescription",
DROP COLUMN "linkURL",
DROP COLUMN "videoURL",
ADD COLUMN     "cite_text" TEXT DEFAULT '',
ADD COLUMN     "link_URL" TEXT DEFAULT '',
ADD COLUMN     "link_description" TEXT DEFAULT '',
ADD COLUMN     "video_URL" TEXT DEFAULT '';
