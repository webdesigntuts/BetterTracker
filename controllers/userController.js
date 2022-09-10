import prisma from "../constats/config.js";
import bcrypt from "bcrypt";

const user_update_meta = async (req, res) => {
  const { firstName, lastName } = req.body;
  if (req.session.userId) {
    try {
      await prisma.user.update({
        where: {
          id: req.session.userId,
        },
        data: {
          firstName: firstName,
          lastName: lastName,
        },
      });
      res.status(200).send("Updated");
    } catch (e) {
      console.log(e);
      res.status(500).send("Error {Update Meta}");
    }
  } else {
    res.status(401).json({ message: "Please Login" });
  }
};

//UPDATE PW
const user_update_password = async (req, res) => {
  const { password, oldPassword } = req.body;
  let user;
  if (req.session.userId) {
    //FIND USER
    try {
      user = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
      });
    } catch {
      res.status(500).send("err");
      return;
    }
  } else {
    res.status(401).json({ message: "Please Login" });
  }

  //IF USER IS FOUND
  if (user) {
    const isPassCorrect = await bcrypt.compare(oldPassword, user.password);
    if (isPassCorrect) {
      //hash and salt new pw
      const saltRounds = 10;
      let newPassword = await bcrypt.hash(password, saltRounds);
      try {
        await prisma.user.update({
          where: {
            id: req.session.userId,
          },
          data: {
            password: newPassword,
          },
        });
      } catch {
        res.status(500).send("Cannot update pw");
      }
    } else {
      //IF PW IS NOT CORRECT
      res.status(403).send("wrong pw");
    }
  } else {
    res.status(401).json({ message: "Please Login" });
  }
};

const user_delete = async (req, res) => {
  let userId;
  if (req.session.userId) {
    userId = req.session.userId;
    req.session.destroy((err) => {
      if (err) res.status(500).send("Cannot destroy session");
      else res.status(200).send("Deleted");
    });
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
  } else {
    res.status(401).json({ message: "Please Login" });
  }
};

export { user_update_meta, user_update_password, user_delete };
