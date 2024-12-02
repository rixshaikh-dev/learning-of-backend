import passport from "passport";
import LocalStrategy from "passport-local";
import userModel from "./models/userModel.js";

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
  try {

    const user = await userModel.find({ username: USERNAME });

    if (!user)
      return done(null, false, { massage: "Incorrect username." })

    const isPassowordMatch = user.password === password ? true : false;

    if (isPassowordMatch) {
      return done(null, user)
    } else {
      return done(null, { massage: "Incorrect password." })
    }

  } catch (err) {
    return done()
  }
}))

export default passport;