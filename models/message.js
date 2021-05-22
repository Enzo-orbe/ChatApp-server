const { Schema, model } = require("mongoose");

const MesaggeSchema = Schema(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

MesaggeSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Message", MesaggeSchema);
