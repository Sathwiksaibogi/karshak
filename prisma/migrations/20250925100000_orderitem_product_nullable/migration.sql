-- Make OrderItem.productId nullable to support machinery rentals
ALTER TABLE "public"."OrderItem" ALTER COLUMN "productId" DROP NOT NULL;


