import mongoose from "mongoose";

const voteSchema = new mongoose.Schema(
  {
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    option: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Option",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    anonymousId: { type: String },
  },
  { timestamps: true },
);

voteSchema.index({ user: 1, question: 1 }, { unique: true, sparse: true });
voteSchema.index(
  { anonymousId: 1, question: 1 },
  { unique: true, sparse: true },
);



voteSchema.pre("save", function () {
  if (!this.user && !this.anonymousId) {
    throw new Error("Either user or anonymousId is required")
  }
})



 //it tells MongoDB to skip the unique check for documents where the field is null/undefined (since anonymous votes won't have user and logged-in votes won't have anonymousId)

export default mongoose.model("Vote", voteSchema);
