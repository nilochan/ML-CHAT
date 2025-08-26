import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface IChatRoom extends Document {
  name: string;
  participants: IUser['_id'][];
  createdAt: Date;
  isGroupChat: boolean;
}

const chatRoomSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    isGroupChat: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient querying
chatRoomSchema.index({ participants: 1 });

const ChatRoom = mongoose.model<IChatRoom>('ChatRoom', chatRoomSchema);
export default ChatRoom;