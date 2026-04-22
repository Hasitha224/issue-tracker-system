import { Schema, model } from 'mongoose';

const IssueSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['open', 'in_progress', 'resolved'],
        default: 'open',
    },
    severity: {
        type: String,
        enum: ['critical', 'high', 'medium', 'low'],
        default: 'medium',
    },
    priority: {
        type: String,
        enum: ['high', 'medium', 'low'],
        default: 'medium',
    },
    // Reference to User
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

IssueSchema.index({ createdAt: -1});

export default model('Issue', IssueSchema);