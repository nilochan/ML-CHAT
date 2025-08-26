import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IMessage extends Document {
  sender: IUser['_id'];
  content: string;
  timestamp: Date;
  room?: string;
}

const messageSchema: Schema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    room: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Message = mongoose.model<IMessage>('Message', messageSchema);
export default Message;