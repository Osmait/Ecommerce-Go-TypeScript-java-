-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('Active', 'processing', 'shipped', 'delivered');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'Active';
