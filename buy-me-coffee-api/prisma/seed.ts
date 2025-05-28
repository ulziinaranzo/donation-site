
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.user.findFirst({
    where: { email: "anonymous@donate.com" },
  });

  if (!existing) {
    await prisma.user.create({
      data: {
        email: "anonymous@donate.com",
        password: "", 
        profile: {
          create: {
            name: "Anonymous",
            avatarImage: "",
            about: "Someone who donated without revealing identity",
             socialMediaUrl: "https://twitter.com/testuser"
          },
        },
      },
    });

    console.log("✅ Anonymous user created.");
  } else {
    console.log("ℹ️ Anonymous user already exists.");
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
