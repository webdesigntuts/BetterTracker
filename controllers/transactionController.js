import prisma from "../constats/config.js";
import { DateTime } from "luxon";
import { z } from "zod";

const transaction_post = async (req, res) => {
  const { title, money, date, info, transactionCategoryId } = req.body;

  const schema = z.object({
    title: z.string().min(2, { message: "Title must be a least two chars" }),
    money: z.number().positive({ message: "Money must be a positive value" }),
    date: z.string().optional(),
    info: z.string().optional(),
    transactionCategoryId: z
      .string()
      .min(1, "transactionCategoryId is required"),
  });

  const isValid = schema.safeParse(req.body);
  if (isValid.error) {
    res.status(400).json({
      errors: isValid?.error?.errors,
      message: "Please fill all the fields",
    });
    return;
  }

  try {
    await prisma.transaction.create({
      data: {
        title: title,
        money: money,
        date: DateTime.fromISO(date).toJSDate(),
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

    res.json({
      transactions:
        transactions?.length > take ? transactions.slice(0, -1) : transactions,
      hasMore: transactions.length > take ? true : false,
    });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const transaction_delete = async (req, res) => {
  const transactionId = req.params.transactionId;
  let tr;
  try {
    tr = await prisma.transaction.deleteMany({
      where: {
        id: transactionId,
        userId: req.session.userId,
      },
    });

    res.status(200).send("success");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { transaction_post, transactions_get, transaction_delete };
