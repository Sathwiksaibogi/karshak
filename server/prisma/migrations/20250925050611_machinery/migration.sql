-- AlterTable
ALTER TABLE "public"."OrderItem" ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "machineryId" TEXT,
ADD COLUMN     "pricingType" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'product';

-- CreateTable
CREATE TABLE "public"."Machinery" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "pricingType" TEXT NOT NULL,
    "imageUrl" TEXT,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "farmerId" TEXT NOT NULL,

    CONSTRAINT "Machinery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."OrderItem" ADD CONSTRAINT "OrderItem_machineryId_fkey" FOREIGN KEY ("machineryId") REFERENCES "public"."Machinery"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Machinery" ADD CONSTRAINT "Machinery_farmerId_fkey" FOREIGN KEY ("farmerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
