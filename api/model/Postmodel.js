import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
    userid:
    {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://media.licdn.com/dms/image/C4D12AQEnxZiMwu-LDA/article-inline_image-shrink_1500_2232/0/1582700835875?e=1718841600&v=beta&t=3v2rg6Rfx6o3qMc-f1wCq0XeB_Y4xdNxrtJKQmnO6PU",
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        default: "Uncategorized",
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    },{timestamps: true});

    const Post = mongoose.model("Post", postSchema);

    export default Post;