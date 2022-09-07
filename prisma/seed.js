const { prisma } = require("../constats/config.js");
//ADD CATEGORIES AS SEED DATA
const seed = async () => {
  try {
    let ctgs = await prisma.transactionCategory.findMany();
  } catch {
    console.log("error seeding");
  }
};

seed();
