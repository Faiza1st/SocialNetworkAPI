const { Schema, model, Types } = require("mongoose");


const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionText: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleString(),
    },
  },
  {
    toJSON: { 
        virtuals: true, 
        getters: true },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 300,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => new Date(timestamp).toLocaleString(),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { 
        virtuals: true, 
        getters: true },
    id: false,
  }
);

// Function to get the length of the reactions array
thoughtSchema.virtual("reactionCount").get(function () {
    // Return the length of the reactions array
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;