const { prisma } = require("../constats/config");
const bcrypt = require("bcrypt");

const auth_login = async (req, res) => {
  let user;
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "Fields Missing" });
    return;
  }

  try {
    user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    //CHECK PW
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      //ADD USER ID TO THE SESSION
      req.session.userId = user.id;
      res.status(200).send("Authed");
    } else {
      res.status(400).json({ message: "Invalid Creditantials" });
    }
  } catch (e) {
    if (!user) res.status(400).json({ message: "Invalid Creditantials" });
    else res.status(400).json({ message: "Something went Wrong" });
  }
};

const auth_register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  let emailCheck;
  try {
    emailCheck = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }

  if (emailCheck) res.status(500).json({ message: "Email already exists" });
  else {
    const saltRounds = 10;
    let salted_password = await bcrypt.hash(password, saltRounds);
    let newUser;

    try {
      newUser = await prisma.user.create({
        data: {
          email: email,
          password: salted_password,
          firstName: firstName,
          lastName: lastName,
        },
      });

      // await prisma.transactionCategory.createMany({
      //   data: [
      //     {
      //       name: "Products",
      //       userId: newUser.id,
      //     },
      //     {
      //       name: "Entertainment",
      //       userId: newUser.id,
      //     },
      //     {
      //       name: "Bills",
      //       userId: newUser.id,
      //     },
      //   ],
      // });

      res.status(200).json({ userId: newUser.id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: "Something Went Wrong" });
      return;
    }
  }
};

const auth_logout = async (req, res) => {
  if (req.session.userId) {
    req.session.destroy((err) => {
      if (err) res.status(500).send("Cannot destroy session");
      else res.status(200).send("Deleted");
    });
  } else {
    res.status(401).send("Please Login");
  }
};

const auth_user = async (req, res) => {
  if (req.session.userId) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.session.userId,
        },
      });
      if (!user) res.status(401).json("User Not Found");
      const data = {
        email: user.email,
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      res.status(200).json(data);
    } catch {
      res.status(500).json("Something Went Wrong {auth}");
    }
  } else {
    res.status(401).send("Please Login");
  }
};

module.exports = {
  auth_register,
  auth_login,
  auth_logout,
  auth_user,
};
