const mongoose =requier("mongoose")
const userShema= mongoose.Shema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true },
    phone: { type: Number, required: true },
    isVerified: { type: Boolean, default: false },
  
  });
  
userSchema.virtual("id").get(function () {
    return this._id.toHexString();
  });
  userSchema.set("toJSON", {
    virtuals: true,
  });
  
  
  
  exports.User = mongoose.model("user", userSchema);
