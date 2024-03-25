import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// hash password before savign to db
// (this is make controller more cleaner but i just dont like it, but just learning purpose)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password for login
// (this is make controller more cleaner but i just dont like it, but just learning purpose)
UserSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

const User = mongoose.model("User", UserSchema);
export default User;
