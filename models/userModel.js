import mongoose from "mongoose";

//schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "username is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  address: {
    type: Array,
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
  },
  answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
  userType: {
    type: String,
    required: [true, "usertype is required"],
    default: "client",
    enum: ["client", "admin", "vendor", "driver"],
  },
  profile: {
    type: String,
    default:
      "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  },
},{timestamps:true});

// Create Model
const userModel = mongoose.model("users", userSchema);

//export
export default userModel;