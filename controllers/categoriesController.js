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

const categories_post = async (req, res) => {
  if (req.session.userId) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Please Enter a Name" });
    try {
      const ctgs = await prisma.transactionCategory.create({
        data: {
          name: name,
          userId: req.session.userId,
        },
      });
      res.status(201).json(ctgs);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong" });
    }
  } else {
    res.status(401).send("Please Login");
  }
};

const category_delete = async (req, res) => {
  if (req.session.userId) {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Please Enter a Name" });
    try {
      const ctgs = await prisma.transactionCategory.deleteMany({
        where: {
          id: id,
          userId: req.session.userId,
        },
      });
      res.status(201).json(ctgs);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong" });
    }
  } else {
    res.status(401).send("Please Login");
  }
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
          userId: req.session.userId,
          date: {
            gte: firstDate,
            lt: lastDate,
          },
        },
      });
      res.status(200).json({ transactions });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Something Went Wrong" });
    }
  }
};

module.exports = {
  categories_get,
  categories_transaction_sum,
  categories_post,
  category_delete,
};
