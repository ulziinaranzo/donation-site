-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "senderId" INTEGER;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
