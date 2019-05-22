const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newBlog = new Schema({
  blogCode :{
    type : String,
    required : true
  },
  title: { 
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: [
    {
      img: {
        type: String
      },
      link: {
        type: String
      },
      blogContent: {
        type: String
      },
      styleCode: {
        type: String
      }
    }
  ],
  writerCode: {
    type: String,
    required : true
  },
  writerName: {
    type: String,
    required: true
  },
  comments: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
      },
      comment: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      userName: {
        type: String,
        required: true
      },
      userAvatar: {
        type: String,
        required: true
      }
    }
  ],
  likedBy: [
    {
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "Users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = NewBlog = mongoose.model("blog", newBlog);
