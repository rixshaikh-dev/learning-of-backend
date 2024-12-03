import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
  const user = this;

  // Hash the password only if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  try {
    // Hash password generation
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(user.password,)

    // Override the plain password with hashed one
    user.password = hashedPassword

    next();
  } catch (err) {
    return next(err)
  }
})

userSchema.methods.comparePassword = async function (canidatePassword) {
  try {
    // Use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(canidatePassword, this.password);
    return isMatch;

  } catch (err) {
    throw err;
  }
}

const userModel = mongoose.model("User", userSchema);

export default userModel;