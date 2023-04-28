const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: { 
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: { 
        type: String, 
        required: true 
    },
    username: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now,
    },
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
        //verify that this qualifies as getter to format timestamp
    },
    username: [
        {
            type: String,
            required: true,
        },
    ],
    reactions: [reactionSchema],
},
    {
        toJSON: {
            virtuals: true,
        },
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;