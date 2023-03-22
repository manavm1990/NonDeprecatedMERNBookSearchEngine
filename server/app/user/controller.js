import User from "./index.js";

const controller = {
  async create(newUser) {
    try {
      const createdUser = await User.create(newUser);

      return createdUser.authenticate(newUser.password);
    } catch (error) {
      if (error.code === 11000) {
        throw new Error("Username/email already exists");
      }
    }
  },
  async show(username, password) {
    const user = await User.findOne({ username });

    return user?.authenticate(password);
  },
};

export default controller;
