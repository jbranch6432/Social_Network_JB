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
  reactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Reactions',
    }
  ]
}, {
     toJSON: {
      getters: true
    },
    id: false
  })

  thoughtsSchema.virtual("reactionCount").get(function(){
    return this.reactions.length;
  })

  const Thoughts = model("Thoughts", thoughtsSchema);

  module.exports = Thoughts;