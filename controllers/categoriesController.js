const { prisma } = require("../constats/config.js");
const { DateTime } = require("luxon");

const categories_get = async (req, res) => {
  if (req.session.userId) {
    let ctgs;
    try {
      ctgs = await prisma.transactionCategory.findMany();

      if (ctgs) res.status(200).json({ ctgs });
    } catch {
      res.status(400).json({ message: "Something Went Wrong" });
    }
  } else res.status(401).send("Please Login");
};

const categories_transaction_sum = async (req, res) => {
  if (req.session.userId) {
    let firstDate = req.query.first;
    let lastDate = DateTime.now().toISO();

    if (!firstDate) {
      firstDate = DateTime.now().minus({ month: 1 }).toISO();
    }

    try {
      const transactions = await prisma.transaction.groupBy({
        by: ["transactionCategoryId"],
        _sum: {
          money: true,
        },
        where: {
          wallet: {
            userId: req.session.userId,
          },
          date: {
            gte: firstDate,
            lt: lastDate,
          },
        },
      });
      res.status(200).json({ transactions });
    } catch {
      res.status(400).json({ message: "Something Went Wrong" });
    }
  }
};

module.exports = {
  categories_get,
  categories_transaction_sum,
};
