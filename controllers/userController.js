import userModel from "../models/userModel.js";

const userRegister = async (req, res) => {
  const { fullname, email, password } = req.body;

  const user = await userModel.create({
    fullname,
    email,
    password
  })
  res.status(200).send(user)
}

const allUsers = async (req, res) => {
  const users = await userModel.find({});

  if (!users) {
    res.status(404).render("index");
  } else {
    res.status(200).render("index", { users });
  }
}


export {
  userRegister,
  allUsers
}