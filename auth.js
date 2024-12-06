import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "./models/userModel.js";

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  try {

    const user = await userModel.findOne({ username: USERNAME });
    console.log(user)
    if (!user)
      return done(null, false, { massage: "Incorrect username." })

    const isPassowordMatch = await user.comparePassword(password);

    if (isPassowordMatch) {
      return done(null, user)
    } else {
      return done(null, false, { massage: "Incorrect password." })
    }

  } catch (err) {
    return done(err)
  }
}))

export default passport;