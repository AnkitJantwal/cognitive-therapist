// userController.js
import User from "../models/userSchema";

// Function to create a new user
async function createUser(username, password) {
  try {
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
}

export default{
 createUser,
};
