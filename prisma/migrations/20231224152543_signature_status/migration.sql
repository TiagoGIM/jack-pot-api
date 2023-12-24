-- CreateEnum
CREATE TYPE "Signature" AS ENUM ('APROVED', 'INITIATED');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "signature" "Signature" NOT NULL DEFAULT 'INITIATED';
