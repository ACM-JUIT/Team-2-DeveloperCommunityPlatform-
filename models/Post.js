```js
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  author: String,

  tag: String,

  likes: {
    type: Number,
    default: 0
  },

  comments: {
    type: Number,
    default: 0
  },

  coverImage: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
```
