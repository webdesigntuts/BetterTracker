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

    const transactions = await prisma.transaction
      .findMany({
        where: {
          wallet: {
            userId: req.session.userId,
          },
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
          transactionCategoryId: {
            equals: category != undefined ? parseInt(category) : undefined,
          },
        },
        skip: parseInt(skip),
        take: parseInt(take),
        orderBy: {
          date: dateSort != undefined ? dateSort : undefined,
          money: priceSort != undefined ? priceSort : undefined,
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
      })
      .catch((e) => {
        res.status(400).send("error");
      });
    res.json(transactions);
  } else res.status(401).send("please login");
};

const transaction_delete = async (req, res) => {
  if (req.session.userId) {
    let transactionId = parseInt(req.params.transactionId);
    let tr;
    try {
      tr = await prisma.transaction.deleteMany({
        where: {
          id: transactionId,
          wallet: {
            userId: req.session.userId,
          },
        },
      });
    } catch (e) {
      res
        .status(500)
        .send(
          "something went wront with the deletion of the particular transaction"
        );
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
