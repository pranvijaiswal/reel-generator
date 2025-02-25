import mongoose, { Schema ,model,models} from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre("save",async function (next)// its a mongoose middleware hook that run
   //before saving the doc to the database
{
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10) //prevents plaintext passwords from being stored
    } //used for hashing passwords
    next(); //calls the next middleware or saves the doc to db
})

// hashing is the process of converting a password into an irreversible string
// using a cryptographic func

const User = models?.User || model<IUser>("User", userSchema)
export default User;