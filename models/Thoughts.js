const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtsSchema = new Schema({
  thoughtText: {
    type: String,
    required: 'You need to leave a thought!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: timestamp => dateFormat(timestamp),
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
}, {
     toJSON: {
      getters: true
    },
    id: false
  })

  thoughtsSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
  })

  const Thoughts = model("Thoughts", thoughtSchema);

  module.exports = Thoughts;