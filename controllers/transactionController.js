const { prisma } = require("../constats/config.js");
const { DateTime } = require("luxon");

const transaction_post = async (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ message: "Please Login" });
    return;
  }

  const { title, money, date, info, transactionCategoryId } = req.body;

  if (!title || !money || !transactionCategoryId) {
    res.status(400).json({ message: "Please fill all the fields" });
    return;
  }

  try {
    await prisma.transaction.create({
      data: {
        title: title,
        money: money,
        date: new Date(),
        info: info,
        transactionCategoryId: transactionCategoryId,
        userId: req.session.userId,
      },
    });
    res.status(200).send("success");
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Something went wrong" });
  }
};

const transactions_get = async (req, res) => {
  if (req.session.userId) {
    let { firstDate, lastDate, category, dateSort, priceSort, take, skip } =
      req.query;

    if (!Number(skip)) {
      skip = 0;
    }
    if (!Number(take)) {
      take = 5;
    }

    try {
      const transactions = await prisma.transaction.findMany({
        where: {
          userId: req.session.userId,
          date: {
            gte:
              firstDate != undefined
                ? DateTime.fromISO(firstDate).toISO()
                : DateTime.now().minus({ days: 30 }).toISO(),
            lt:
              lastDate != undefined
                ? DateTime.fromISO(lastDate).toISO()
                : DateTime.now().toISO(),
          },
          transactionCategoryId: category,
        },
        skip: parseInt(skip),
        take: parseInt(take) + 1,
        orderBy: {
          date: dateSort ?? undefined,
          money: priceSort ?? undefined,
        },
        select: {
          title: true,
          money: true,
          date: true,
          info: true,
          id: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      console.log("--------------------------------------------------");
      console.log("length", transactions.length);
      console.log("take", take);
      console.log(transactions);

      console.log(transactions.length > take ? true : false);

      res.json({
        transactions:
          transactions?.length > take
            ? transactions.slice(0, -1)
            : transactions,
        hasMore: transactions.length > take ? true : false,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else res.status(401).send("please login");
};

const transaction_delete = async (req, res) => {
  if (req.session.userId) {
    const transactionId = req.params.transactionId;
    let tr;
    try {
      tr = await prisma.transaction.deleteMany({
        where: {
          id: transactionId,
          userId: req.session.userId,
        },
      });
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (tr?.count) {
      res.status(200).send("success");
      return;
    }
    res.status(400).send("error");
  } else {
    res.status(401).send("please login");
  }
};

module.exports = {
  transaction_post,
  transactions_get,
  transaction_delete,
};
