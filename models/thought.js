const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/formatDate.js');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatter => dateFormat(formatter)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: { 
            type: String, 
            required: true, 
            minLength: 1,
            maxLength: 280
        },
        createdAt: { 
            type: Date, 
            default: Date.now,
            get: timeFormat => timeFormat.toLocaleString(),
        },
        username: { 
            type: String, 
            required: true, 
        },
        reactions: [ReactionSchema],
        lastAccessed: { 
            type: Date, 
            default: Date.now 
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    },
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
  
module.exports = Thought;
