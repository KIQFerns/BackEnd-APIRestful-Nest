/*
  Warnings:

  - Added the required column `createdAt` to the `Position` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Position" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Position" ("id", "name") SELECT "id", "name" FROM "Position";
DROP TABLE "Position";
ALTER TABLE "new_Position" RENAME TO "Position";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
