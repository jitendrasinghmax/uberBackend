import mongoose, { Schema, Document } from 'mongoose';

export interface IBlacklistToken extends Document {
    token: string;
    createdAt: Date;
}

const BlacklistTokenSchema: Schema = new Schema({
    token: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now, expires: 8644 }, // Token will expire after 7 days
});

const BlacklistToken = mongoose.model<IBlacklistToken>('BlacklistToken', BlacklistTokenSchema);

export default BlacklistToken;