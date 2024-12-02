const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
  try {
    const categories = [
      { name: "Computer Science" },
      { name: "Music" },
      { name: "Fitness" },
      { name: "Photography" },
      { name: "Accounting" },
      { name: "Engineering" },
      { name: "Filming" },
    ];

    for (const category of categories) {
      await db.category.upsert({
        where: { name: category.name },
        update: {}, // No changes if it exists
        create: category, // Create if it doesn't exist
      });
    }

    console.log("Categories seeded successfully without duplicates.");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await db.$disconnect();
  }
}

main();

